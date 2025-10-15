import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { ArrowLeft, QrCode } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OTPInput } from '../../components/onboarding/OTPInput';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

export const SetupAuthenticatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const manualKey = 'JBSWY3DPEHPK3PXP';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(manualKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Authenticator setup complete');
      // Navigate to dashboard or completion screen
      alert('Authenticator setup complete!');
    } catch (error) {
      setError('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/onboarding/mfa-selection')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to MFA options
      </button>

      <ProgressIndicator currentStep={5} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Setup Authenticator App
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Scan the QR code below
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* QR Code Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 border-2 border-border rounded-lg flex items-center justify-center bg-muted/20">
            <QrCode className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>

        {/* Manual Key */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <Typography variant="body2" intent="muted">
            Manual setup key:
          </Typography>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-card border border-border rounded text-sm font-mono text-foreground">
              {manualKey}
            </code>
            <Button type="button" variant="outline" size="sm" onClick={handleCopyKey} className="shrink-0">
              Copy
            </Button>
          </div>
        </div>

        {/* OTP Input */}
        <div className="space-y-2">
          <Typography variant="body2" align="center" className="text-center text-foreground">
            Enter the 6-digit code from your app
          </Typography>
          <OTPInput value={code} onChange={setCode} error={!!error} />
          {error && (
            <Typography variant="body2" className="text-destructive text-center text-xs">
              {error}
            </Typography>
          )}
        </div>

        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Complete Setup'}
        </Button>
      </form>
    </div>
  );
};
