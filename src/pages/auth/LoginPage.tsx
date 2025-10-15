import { Button } from '@vritti/quantum-ui/Button';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Lock } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { EmailField } from '../../components/auth/EmailField';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      console.log('Login successful', formData);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='text-center space-y-2'>
        <Typography variant='h3' align='center' className='text-foreground'>
          Welcome back
        </Typography>
        <Typography variant='body2' align='center' intent='muted'>
          Sign in to your Vritti Cloud account
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <EmailField
          label='Email'
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          message={errors.email}
          required
        />

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-foreground'>Password</label>
            <Link to='/forgot-password' className='text-sm text-primary hover:text-primary/80'>
              Forgot?
            </Link>
          </div>
          <PasswordField
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            message={errors.password}
            startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            required
          />
        </div>

        <Button type='submit' className='w-full bg-primary text-primary-foreground' disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Divider */}
      <AuthDivider />

      {/* Social Auth */}
      <SocialAuthButtons />

      {/* Footer */}
      <div className='text-center'>
        <Typography variant='body2' align='center' intent='muted'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-primary hover:text-primary/80 font-medium'>
            Create one
          </Link>
        </Typography>
      </div>
    </div>
  );
};
