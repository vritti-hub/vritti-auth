import { Button } from '@vritti/quantum-ui/Button';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { TextField } from '@vritti/quantum-ui/TextField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      <form onSubmit={handleSubmit} className="space-y-[10px]">
        {/* First Name and Last Name - Side by side */}
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            error={!!errors.firstName}
            message={errors.firstName}
            startAdornment={<User className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />

          <TextField
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            error={!!errors.lastName}
            message={errors.lastName}
            startAdornment={<User className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />
        </div>

        {/* Work Email */}
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

        {/* Password */}
        <PasswordField
          label="Password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          message={errors.password}
          startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
          required
          showStrengthIndicator
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          placeholder="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={!!errors.confirmPassword}
          message={errors.confirmPassword}
          startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
          required
          showMatchIndicator
          matchPassword={formData.password}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Terms and Conditions */}
        <Typography variant="body2" align="center" intent="muted" className="text-center">
          By creating an account, you agree to our{' '}
          <button type="button" className="text-primary hover:text-primary/80 underline">
            Terms
          </button>{' '}
          &{' '}
          <button type="button" className="text-primary hover:text-primary/80 underline">
            Privacy
          </button>
        </Typography>
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
