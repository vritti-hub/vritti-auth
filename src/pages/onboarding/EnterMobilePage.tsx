import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from '../../components/common/PhoneInput';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

export const EnterMobilePage: React.FC = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobile.trim()) {
      setError('Mobile number is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Sending OTP to:', mobile);
      navigate('/onboarding/verify-otp');
    } catch (error) {
      setError('Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressIndicator currentStep={1} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Enter your mobile number
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          We'll send you a verification code
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PhoneInput
          label="Phone Number"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          message={error}
          required
        />

        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Sending Code...' : 'Send Code'}
        </Button>
      </form>
    </div>
  );
};
