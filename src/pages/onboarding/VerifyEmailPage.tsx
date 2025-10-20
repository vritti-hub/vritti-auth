import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { OTPField } from '@vritti/quantum-ui/OTPField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiStepProgressIndicator } from '../../components/onboarding/MultiStepProgressIndicator';

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email] = useState('user@example.com'); // TODO: Get from signup state

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Email verified with OTP:', otp);
      navigate('/onboarding/verify-mobile');
    } catch (error) {
      console.error('Verification failed', error);
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resending verification code to:', email);
      setOtp('');
    } catch (error) {
      console.error('Failed to resend code', error);
      setError('Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <MultiStepProgressIndicator currentStep={1} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Verify your email
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          We've sent a verification code to
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <Typography variant="body2" align="center" className="text-foreground font-medium">
            {email}
          </Typography>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80"
            onClick={() => navigate('/signup')}
          >
            Change
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <OTPField
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (error) setError('');
          }}
          error={!!error}
          message={error || 'Enter the 6-digit verification code'}
        />

        <Button
          onClick={handleVerify}
          className="w-full bg-primary text-primary-foreground"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Button>

        <Typography variant="body2" align="center" intent="muted" className="text-center">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium"
            onClick={handleResend}
          >
            Resend
          </button>
        </Typography>
      </div>
    </div>
  );
};
