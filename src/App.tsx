import { Button, Card, PasswordField, TextField, ThemeToggle, Typography } from '@vritti/quantum-ui';
import { Shield, UserPlus } from 'lucide-react';
import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Account created successfully!');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>

      <div className='max-w-md mx-auto pt-8'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4'>
            <UserPlus className='w-8 h-8 text-primary' />
          </div>
          <Typography variant='h2' className='text-3xl font-bold mb-2'>
            Create Account
          </Typography>
          <Typography variant='body1' intent='muted'>
            Join us today and get started with your journey
          </Typography>
        </div>

        <Card className='p-8 shadow-xl border-0 bg-card/50 backdrop-blur-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <TextField
              label='Full Name'
              required
              placeholder='Enter your full name'
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={!!errors.fullName}
              message={errors.fullName}
            />

            <TextField
              label='Email Address'
              type='email'
              required
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              message={errors.email}
            />

            <PasswordField
              label='Password'
              required
              placeholder='Create a strong password'
              value={formData.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              message={errors.password}
              showStrengthIndicator={true}
              toggleAriaLabel='Toggle password visibility'
            />

            <PasswordField
              label='Confirm Password'
              required
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              message={errors.confirmPassword}
              toggleAriaLabel='Toggle confirm password visibility'
            />

            <div className='flex items-start space-x-3'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={formData.acceptTerms}
                  onChange={handleChange('acceptTerms')}
                  className='h-4 w-4 text-primary focus:ring-primary border-border rounded'
                />
              </div>
              <div className='text-sm'>
                <label htmlFor='terms' className='text-foreground'>
                  I agree to the{' '}
                  <a href='#' className='text-primary hover:text-primary/80 underline'>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href='#' className='text-primary hover:text-primary/80 underline'>
                    Privacy Policy
                  </a>
                </label>
                {errors.acceptTerms && <p className='text-destructive text-xs mt-1'>{errors.acceptTerms}</p>}
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2' />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className='w-4 h-4 mr-2' />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className='mt-6 pt-6 border-t border-border'>
            <div className='text-center'>
              <Typography variant='body2' intent='muted'>
                Already have an account?{' '}
                <a href='#' className='text-primary hover:text-primary/80 font-medium'>
                  Sign in here
                </a>
              </Typography>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-center space-x-2 text-xs text-muted-foreground'>
            <Shield className='w-3 h-3' />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
