import { Button } from '@vritti/quantum-ui/Button';
import { Checkbox } from '@vritti/quantum-ui/Checkbox';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { TextField } from '@vritti/quantum-ui/TextField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Lock, Mail, Phone, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
    if (errors.acceptTerms) {
      setErrors((prev) => ({ ...prev, acceptTerms: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

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

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Signup successful', formData);
      // navigate('/onboarding/mobile');
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Create your account
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Get started with Vritti Cloud Platform
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name and Email - Side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            error={!!errors.fullName}
            message={errors.fullName}
            startAdornment={<User className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />

          <TextField
            label="Work Email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            message={errors.email}
            startAdornment={<Mail className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />
        </div>

        {/* Mobile Number */}
        <TextField
          label="Mobile Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.mobile}
          onChange={handleChange('mobile')}
          error={!!errors.mobile}
          message={errors.mobile}
          startAdornment={<Phone className="h-3.5 w-3.5 text-muted-foreground" />}
          required
        />

        {/* Password and Confirm - Side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordField
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            message={errors.password}
            startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            required
            showStrengthIndicator
          />

          <PasswordField
            label="Confirm"
            placeholder="Confirm"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!errors.confirmPassword}
            message={errors.confirmPassword}
            startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Terms and Conditions */}
        <div className="space-y-1">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={handleCheckboxChange}
              aria-invalid={!!errors.acceptTerms}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-none cursor-pointer">
              By creating an account, you agree to our{' '}
              <button type="button" className="text-primary hover:text-primary/80 underline">
                Terms
              </button>{' '}
              &{' '}
              <button type="button" className="text-primary hover:text-primary/80 underline">
                Privacy
              </button>
            </label>
          </div>
          {errors.acceptTerms && (
            <Typography variant="body2" className="text-destructive text-xs pl-7">
              {errors.acceptTerms}
            </Typography>
          )}
        </div>
      </form>

      {/* Divider */}
      <AuthDivider />

      {/* Social Auth */}
      <SocialAuthButtons />

      {/* Footer */}
      <div className="text-center">
        <Typography variant="body2" align="center" intent="muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in
          </Link>
        </Typography>
      </div>
    </div>
  );
};
