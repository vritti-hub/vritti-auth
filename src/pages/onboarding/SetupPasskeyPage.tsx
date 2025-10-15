import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { ArrowLeft, Check, Fingerprint } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressIndicator } from '../../components/onboarding/ProgressIndicator';

export const SetupPasskeyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const passkeyBenefits = [
    'More secure than passwords',
    'Uses biometrics or device PIN',
    "Can't be phished or stolen",
    'Works across your devices',
  ];

  const handleCreatePasskey = async () => {
    setIsLoading(true);

    try {
      // TODO: Implement WebAuthn passkey creation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Passkey created successfully');
      alert('Passkey setup complete!');
    } catch (error) {
      console.error('Failed to create passkey', error);
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
          Setup Passkey
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Use biometric or device authentication
        </Typography>
      </div>

      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-22 h-22 rounded-full bg-primary/10 flex items-center justify-center">
            <Fingerprint className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
          <Typography variant="body2" className="font-medium text-foreground">
            What is a passkey?
          </Typography>
          <div className="space-y-2">
            {passkeyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCreatePasskey}
          className="w-full bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Passkey...' : 'Create Passkey'}
        </Button>
      </div>
    </div>
  );
};
