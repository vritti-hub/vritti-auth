import { Button } from '@vritti/quantum-ui/Button';
import { Typography } from '@vritti/quantum-ui/Typography';
import { OTPField } from '@vritti/quantum-ui/OTPField';
import { ArrowLeft, CheckCircle, KeyRound, Loader2, Smartphone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiStepProgressIndicator } from '../../components/onboarding/MultiStepProgressIndicator';

type MFAMethod = 'authenticator' | 'passkey' | null;
type FlowStep = 1 | 2 | 3; // 1=Selection, 2=Setup, 3=Complete

export const MFASetupFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>(1);
  const [selectedMethod, setSelectedMethod] = useState<MFAMethod>(null);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const manualKey = 'JBSWY3DPEHPK3PXP';

  // TODO: Fetch onboarding progress from API on mount
  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchProgress = async () => {
      // const data = await fetch('/api/onboarding/progress').then(r => r.json());
      // setCurrentStep(data.mfaStep || 1);
      // setSelectedMethod(data.mfaMethod || null);
    };
    fetchProgress();
  }, []);

  // Auto-redirect on completion
  useEffect(() => {
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        navigate('/dashboard'); // TODO: Update to actual dashboard route
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  const handleMethodSelect = (method: 'authenticator' | 'passkey') => {
    setSelectedMethod(method);
  };

  const handleContinueSelection = async () => {
    if (!selectedMethod) return;

    // TODO: Update API with selected method
    // await fetch('/api/onboarding/progress', {
    //   method: 'POST',
    //   body: JSON.stringify({ mfaStep: 2, mfaMethod: selectedMethod })
    // });

    setCurrentStep(2);
  };

  const handleSkipMFA = async () => {
    // TODO: Update API to skip MFA
    // await fetch('/api/onboarding/progress', {
    //   method: 'POST',
    //   body: JSON.stringify({ mfaStep: 3, mfaMethod: 'skipped' })
    // });

    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleAuthenticatorSubmit = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    try {
      // TODO: Verify OTP with API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Authenticator verified with OTP:', otp);

      // TODO: Update API
      // await fetch('/api/onboarding/progress', {
      //   method: 'POST',
      //   body: JSON.stringify({ mfaStep: 3, mfaMethod: 'authenticator' })
      // });

      setCurrentStep(3);
    } catch (error) {
      console.error('Verification failed', error);
      setOtpError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySubmit = async () => {
    setIsLoading(true);

    try {
      // TODO: Implement WebAuthn passkey creation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Passkey created successfully');

      // TODO: Update API
      // await fetch('/api/onboarding/progress', {
      //   method: 'POST',
      //   body: JSON.stringify({ mfaStep: 3, mfaMethod: 'passkey' })
      // });

      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to create passkey', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: MFA Selection
  const renderSelectionStep = () => (
    <div className="space-y-6">
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
            onChange={() => handleMethodSelect('authenticator')}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-foreground" />
              <Typography variant="body1" className="font-medium text-foreground">
                Authenticator App
              </Typography>
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
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
            onChange={() => handleMethodSelect('passkey')}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-foreground" />
              <Typography variant="body1" className="font-medium text-foreground">
                Passkey
              </Typography>
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
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
        Email and SMS are already verified and available as backup options
      </Typography>

      <Button
        onClick={handleContinueSelection}
        className="w-full bg-primary text-primary-foreground"
        disabled={!selectedMethod}
      >
        Continue
      </Button>

      <Button
        variant="outline"
        onClick={handleSkipMFA}
        className="w-full border-border text-foreground"
      >
        Skip for now
      </Button>
    </div>
  );

  // Step 2a: Setup Authenticator
  const renderAuthenticatorStep = () => (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to MFA options
      </button>

      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Setup Authenticator App
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Scan the QR code below
        </Typography>
      </div>

      <div className="space-y-4">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="w-[193px] h-[193px] border border-border rounded-lg p-4 bg-white">
            <div className="w-[160px] h-[160px] bg-secondary rounded-lg flex items-center justify-center">
              <Typography variant="body2" intent="muted" className="text-center">
                QR Code
                <br />
                (160x160)
              </Typography>
            </div>
          </div>
        </div>

        {/* Manual Key */}
        <div className="p-4 bg-muted/50 border border-border rounded-lg space-y-2">
          <Typography variant="body2" className="font-medium text-foreground">
            Manual setup key:
          </Typography>
          <div className="px-3 py-2 bg-secondary border border-border rounded text-sm font-mono text-foreground">
            {manualKey}
          </div>
        </div>

        {/* OTP Input */}
        <OTPField
          label="Enter the 6-digit code from your app"
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (otpError) setOtpError('');
          }}
          error={!!otpError}
          message={otpError}
        />

        <Button
          onClick={handleAuthenticatorSubmit}
          className="w-full bg-primary text-primary-foreground"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );

  // Step 2b: Setup Passkey
  const renderPasskeyStep = () => (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to MFA options
      </button>

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
          <div className="w-[88px] h-[88px] rounded-lg bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 bg-muted/50 border border-border rounded-lg space-y-3">
          <Typography variant="body2" className="font-medium text-foreground">
            What is a passkey?
          </Typography>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="pl-4">• More secure than passwords</li>
            <li className="pl-4">• Uses biometrics or device PIN</li>
            <li className="pl-4">• Can't be phished or stolen</li>
            <li className="pl-4">• Works across your devices</li>
          </ul>
        </div>

        <Button
          onClick={handlePasskeySubmit}
          className="w-full bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Passkey...' : 'Create Passkey'}
        </Button>
      </div>
    </div>
  );

  // Step 3: Complete
  const renderCompleteStep = () => (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {/* Title and Message */}
      <div className="space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          All set!
        </Typography>
        <Typography variant="body2" align="center" intent="muted" className="max-w-[332px] mx-auto">
          Your account has been created and secured with multi-factor authentication.
        </Typography>
      </div>

      {/* Loading Spinner */}
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>

      <Typography variant="body2" align="center" intent="muted">
        Redirecting you to your dashboard...
      </Typography>
    </div>
  );

  // Calculate sub-step progress for step 3 (Enable 2FA)
  const calculateStepProgress = (): number => {
    if (currentStep === 1) return 33; // MFA Selection
    if (currentStep === 2) return 66; // Setup in progress
    return 100; // Complete
  };

  return (
    <div className="space-y-6">
      <MultiStepProgressIndicator
        currentStep={currentStep === 3 ? 4 : 3}
        stepProgress={currentStep < 3 ? { 3: calculateStepProgress() } : {}}
      />

      {currentStep === 1 && renderSelectionStep()}
      {currentStep === 2 && selectedMethod === 'authenticator' && renderAuthenticatorStep()}
      {currentStep === 2 && selectedMethod === 'passkey' && renderPasskeyStep()}
      {currentStep === 3 && renderCompleteStep()}
    </div>
  );
};
