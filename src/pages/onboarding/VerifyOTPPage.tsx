import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Smartphone } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OTPInput } from '../../components/onboarding/OTPInput';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

export const VerifyOTPPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Verifying OTP:', otp);
      navigate('/onboarding/set-password');
    } catch (error) {
      setError('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    console.log('Resending OTP');
    setOtp('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <ProgressIndicator currentStep={2} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Verify your mobile
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Enter the code sent to 6301216587
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <Smartphone className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <OTPInput value={otp} onChange={setOtp} error={!!error} />
          {error && (
            <Typography variant="body2" className="text-destructive text-center text-xs">
              {error}
            </Typography>
          )}
        </div>

        <Typography variant="body2" align="center" intent="muted" className="text-center">
          Enter the 6-digit code sent via SMS
        </Typography>

        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>

        <div className="flex justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => navigate('/onboarding/mobile')}
            className="text-primary hover:text-primary/80"
          >
            Change number
          </button>
          <button type="button" onClick={handleResend} className="text-primary hover:text-primary/80">
            Resend code
          </button>
        </div>
      </form>
    </div>
  );
};
