import { Button } from '@vritti/quantum-ui/Button';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Check, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

export const SetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    {
      label: 'Uppercase, lowercase & number',
      met: /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) && /[0-9]/.test(formData.password),
    },
  ];

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Password set successfully');
      navigate('/onboarding/mfa-selection');
    } catch (error) {
      console.error('Failed to set password', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressIndicator currentStep={3} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Create a password
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Secure your account with a password
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          message={errors.password}
          startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
          required
          showStrengthIndicator
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={!!errors.confirmPassword}
          message={errors.confirmPassword}
          startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
          required
        />

        <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className={`flex items-center justify-center w-4 h-4 rounded-full ${
                  req.met ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'
                }`}
              >
                {req.met && <Check className="w-3 h-3" />}
              </div>
              <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>{req.label}</span>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Setting Password...' : 'Set Password'}
        </Button>
      </form>
    </div>
  );
};
