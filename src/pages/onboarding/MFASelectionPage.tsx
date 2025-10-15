import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { KeyRound, Smartphone } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

type MFAMethod = 'authenticator' | 'passkey' | null;

export const MFASelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<MFAMethod>(null);

  const handleContinue = () => {
    if (selectedMethod === 'authenticator') {
      navigate('/onboarding/setup-authenticator');
    } else if (selectedMethod === 'passkey') {
      navigate('/onboarding/setup-passkey');
    }
  };

  return (
    <div className="space-y-6">
      <ProgressIndicator currentStep={4} />

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Secure your account
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Add multi-factor authentication
        </Typography>
      </div>

      <div className="space-y-3">
        {/* Authenticator App Option */}
        <label
          className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMethod === 'authenticator'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <input
            type="radio"
            name="mfa"
            value="authenticator"
            checked={selectedMethod === 'authenticator'}
            onChange={() => setSelectedMethod('authenticator')}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-foreground" />
              <Typography variant="body1" className="font-medium text-foreground">
                Authenticator App
              </Typography>
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground">
                Recommended
              </span>
            </div>
            <Typography variant="body2" intent="muted">
              Use Google Authenticator, Authy, or similar apps
            </Typography>
          </div>
        </label>

        {/* Passkey Option */}
        <label
          className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMethod === 'passkey' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
        >
          <input
            type="radio"
            name="mfa"
            value="passkey"
            checked={selectedMethod === 'passkey'}
            onChange={() => setSelectedMethod('passkey')}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-foreground" />
              <Typography variant="body1" className="font-medium text-foreground">
                Passkey
              </Typography>
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground">
                Most Secure
              </span>
            </div>
            <Typography variant="body2" intent="muted">
              Use biometrics or device authentication
            </Typography>
          </div>
        </label>
      </div>

      <Typography variant="body2" align="center" intent="muted" className="text-center">
        Email and SMS are already verified and available as backup methods
      </Typography>

      <Button
        onClick={handleContinue}
        className="w-full bg-primary text-primary-foreground"
        disabled={!selectedMethod}
      >
        Continue
      </Button>
    </div>
  );
};
