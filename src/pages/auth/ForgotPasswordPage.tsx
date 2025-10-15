import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailField } from '../../components/auth/EmailField';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateEmail();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Password reset email sent to:', email);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to send reset email', error);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='space-y-6 text-center'>
        <div className='space-y-2'>
          <Typography variant='h3' align='center' className='text-foreground'>
            Check your email
          </Typography>
          <Typography variant='body2' align='center' intent='muted'>
            We've sent a password reset link to
          </Typography>
          <Typography variant='body2' align='center' className='text-foreground font-medium'>
            {email}
          </Typography>
        </div>

        <div className='space-y-4'>
          <Typography variant='body2' align='center' intent='muted'>
            Didn't receive the email? Check your spam folder or
          </Typography>
          <Button
            variant='outline'
            className='w-full border-border text-foreground'
            onClick={() => setIsSuccess(false)}
          >
            Try another email
          </Button>
        </div>

        <Link
          to='/login'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Back Link */}
      <Link to='/login' className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'>
        <ArrowLeft className='h-3 w-3' />
        Back to sign in
      </Link>

      {/* Header */}
      <div className='text-center space-y-2'>
        <Typography variant='h3' align='center' className='text-foreground'>
          Reset your password
        </Typography>
        <Typography variant='body2' align='center' intent='muted'>
          Enter your email to receive a reset link
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <EmailField
          label='Email Address'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          message={error}
          required
        />

        <Button type='submit' className='w-full bg-primary text-primary-foreground' disabled={isLoading}>
          {isLoading ? 'Sending reset link...' : 'Send reset link'}
        </Button>
      </form>
    </div>
  );
};
