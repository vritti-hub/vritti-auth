import { Button } from '@vritti/quantum-ui/Button';
import { OTPField } from '@vritti/quantum-ui/OTPField';
import { PhoneField, isValidPhoneNumber, type PhoneValue } from '@vritti/quantum-ui/PhoneField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { ArrowLeft, CheckCircle, ChevronRight, Loader2, MessageSquare, Phone, QrCode, Smartphone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MultiStepProgressIndicator } from '../../components/onboarding/MultiStepProgressIndicator';

type VerificationMethod = 'whatsapp' | 'sms' | 'manual' | null;
type FlowStep = 1 | 2 | 3; // 1=Method Selection, 2=Verification, 3=Success

export const VerifyMobileFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>(1);
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>(null);
  const [phoneNumber, setPhoneNumber] = useState<PhoneValue>();
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);

  // TODO: Fetch verification progress from API on mount
  useEffect(() => {
    const fetchProgress = async () => {
      // const data = await fetch('/api/onboarding/verify-mobile/progress').then(r => r.json());
      // setCurrentStep(data.step || 1);
      // setSelectedMethod(data.method || null);
      // setPhoneNumber(data.phoneNumber || '');
    };
    fetchProgress();
  }, []);

  // Poll for QR verification status (WhatsApp/SMS)
  useEffect(() => {
    if (currentStep === 2 && (selectedMethod === 'whatsapp' || selectedMethod === 'sms') && isVerifying) {
      const checkInterval = setInterval(async () => {
        // TODO: Poll API for verification status
        // const status = await fetch('/api/onboarding/verify-mobile/status').then(r => r.json());
        // if (status.verified) {
        //   clearInterval(checkInterval);
        //   setCurrentStep(3);
        // }

        // Simulate random verification for demo
        if (Math.random() > 0.9) {
          clearInterval(checkInterval);
          setPhoneNumber(undefined); // Mock verified number
          setCurrentStep(3);
        }
      }, 3000);

      return () => clearInterval(checkInterval);
    }
  }, [currentStep, selectedMethod, isVerifying]);

  const handleMethodSelect = (method: 'whatsapp' | 'sms' | 'manual') => {
    setSelectedMethod(method);

    if (method === 'manual') {
      setShowOtpStep(false);
      setCurrentStep(2);
    } else {
      setIsVerifying(true);
      setCurrentStep(2);
    }
  };

  const handleBackToMethods = () => {
    setSelectedMethod(null);
    setIsVerifying(false);
    setShowOtpStep(false);
    setCurrentStep(1);
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setPhoneError('Mobile number is required');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setPhoneError('');

    try {
      // TODO: Send OTP via API
      // await fetch('/api/onboarding/verify-mobile/send-otp', {
      //   method: 'POST',
      //   body: JSON.stringify({ phoneNumber })
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Sending OTP to:', phoneNumber);
      setShowOtpStep(true);
    } catch (error) {
      setPhoneError('Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    try {
      // TODO: Verify OTP via API
      // await fetch('/api/onboarding/verify-mobile/verify-otp', {
      //   method: 'POST',
      //   body: JSON.stringify({ phoneNumber, otp })
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Verifying OTP:', otp);
      setCurrentStep(3);
    } catch (error) {
      setOtpError('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resending OTP to:', phoneNumber);
      setOtp('');
    } catch (error) {
      setOtpError('Failed to resend code. Please try again.');
    }
  };

  const handleContinue = () => {
    navigate('/onboarding/mfa-setup');
  };

  // Step 1: Method Selection
  const renderMethodSelection = () => {
    const methods = [
      {
        id: 'whatsapp',
        title: 'WhatsApp QR Code',
        description: 'Scan QR code with WhatsApp',
        icon: <MessageSquare className='h-5 w-5' />,
        badge: 'Recommended',
      },
      {
        id: 'sms',
        title: 'SMS QR Code',
        description: 'Scan QR code with SMS app',
        icon: <QrCode className='h-5 w-5' />,
      },
      {
        id: 'manual',
        title: 'Enter mobile number',
        description: 'Manually enter your mobile number',
        icon: <Phone className='h-5 w-5' />,
      },
    ];

    return (
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <Typography variant='h3' align='center' className='text-foreground'>
            Verify your mobile
          </Typography>
          <Typography variant='body2' align='center' intent='muted'>
            Choose verification method
          </Typography>
        </div>

        <div className='space-y-3'>
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id as 'whatsapp' | 'sms' | 'manual')}
              className='w-full p-4 rounded-lg border-2 border-border hover:border-primary transition-all flex items-center gap-4 text-left group'
            >
              <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-foreground'>
                {method.icon}
              </div>
              <div className='flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <Typography variant='body1' className='font-medium text-foreground'>
                    {method.title}
                  </Typography>
                  {method.badge && (
                    <span className='px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground'>
                      {method.badge}
                    </span>
                  )}
                </div>
                <Typography variant='body2' intent='muted'>
                  {method.description}
                </Typography>
              </div>
              <ChevronRight className='h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors' />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 2a: WhatsApp Verification
  const renderWhatsAppVerification = () => (
    <div className='space-y-6'>
      <Link
        to='#'
        onClick={(e) => {
          e.preventDefault();
          handleBackToMethods();
        }}
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to methods
      </Link>

      <div className='text-center space-y-2'>
        <Typography variant='h3' align='center' className='text-foreground'>
          Scan with WhatsApp
        </Typography>
        <Typography variant='body2' align='center' intent='muted'>
          Open WhatsApp and scan this QR code
        </Typography>
      </div>

      <div className='space-y-4'>
        {/* QR Code */}
        <div className='flex justify-center'>
          <div className='w-[180px] h-[180px] bg-secondary border-2 border-border rounded-lg flex items-center justify-center'>
            <Typography variant='body2' intent='muted' className='text-center px-4'>
              QR Code
              <br />
              (180x180)
            </Typography>
          </div>
        </div>

        {/* Instructions */}
        <div className='space-y-2'>
          <Typography variant='body2' className='text-foreground font-medium text-center'>
            How to scan:
          </Typography>
          <ol className='space-y-1 text-sm text-muted-foreground'>
            <li>1. Open WhatsApp on your phone</li>
            <li>2. Tap Menu or Settings</li>
            <li>3. Tap Linked Devices</li>
            <li>4. Tap Link a Device</li>
            <li>5. Point your phone at this screen to scan the code</li>
          </ol>
        </div>

        {/* Waiting Status */}
        {isVerifying && (
          <div className='flex items-center justify-center gap-2 py-2'>
            <Loader2 className='h-4 w-4 animate-spin text-primary' />
            <Typography variant='body2' intent='muted'>
              Waiting for verification...
            </Typography>
          </div>
        )}

        {/* Alternative Method */}
        <Typography variant='body2' align='center' intent='muted' className='text-center'>
          Having trouble?{' '}
          <button onClick={handleBackToMethods} className='text-primary hover:text-primary/80 font-medium'>
            Try another method
          </button>
        </Typography>
      </div>
    </div>
  );

  // Step 2b: SMS Verification
  const renderSmsVerification = () => (
    <div className='space-y-6'>
      <Link
        to='#'
        onClick={(e) => {
          e.preventDefault();
          handleBackToMethods();
        }}
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to methods
      </Link>

      <div className='text-center space-y-2'>
        <Typography variant='h3' align='center' className='text-foreground'>
          Scan with SMS
        </Typography>
        <Typography variant='body2' align='center' intent='muted'>
          Open your SMS app and scan this QR code
        </Typography>
      </div>

      <div className='space-y-4'>
        {/* QR Code */}
        <div className='flex justify-center'>
          <div className='w-[180px] h-[180px] bg-secondary border-2 border-border rounded-lg flex items-center justify-center'>
            <Typography variant='body2' intent='muted' className='text-center px-4'>
              QR Code
              <br />
              (180x180)
            </Typography>
          </div>
        </div>

        {/* Instructions */}
        <div className='space-y-2'>
          <Typography variant='body2' className='text-foreground font-medium text-center'>
            How to scan:
          </Typography>
          <ol className='space-y-1 text-sm text-muted-foreground'>
            <li>1. Open your phone's camera or QR code scanner</li>
            <li>2. Point your camera at this QR code</li>
            <li>3. Tap the notification to open SMS</li>
            <li>4. Send the pre-filled message</li>
            <li>5. Wait for automatic verification</li>
          </ol>
        </div>

        {/* Waiting Status */}
        {isVerifying && (
          <div className='flex items-center justify-center gap-2 py-2'>
            <Loader2 className='h-4 w-4 animate-spin text-primary' />
            <Typography variant='body2' intent='muted'>
              Waiting for verification...
            </Typography>
          </div>
        )}

        {/* Alternative Method */}
        <Typography variant='body2' align='center' intent='muted' className='text-center'>
          Having trouble?{' '}
          <button onClick={handleBackToMethods} className='text-primary hover:text-primary/80 font-medium'>
            Try another method
          </button>
        </Typography>
      </div>
    </div>
  );

  // Step 2c: Manual Entry (Phone Number + OTP)
  const renderManualVerification = () => {
    if (!showOtpStep) {
      // Phone number input
      return (
        <div className='space-y-6'>
          <Link
            to='#'
            onClick={(e) => {
              e.preventDefault();
              handleBackToMethods();
            }}
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to methods
          </Link>

          <div className='text-center space-y-2'>
            <Typography variant='h3' align='center' className='text-foreground'>
              Enter your mobile number
            </Typography>
            <Typography variant='body2' align='center' intent='muted'>
              We'll send you a verification code
            </Typography>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOtp();
            }}
            className='space-y-6'
          >
            <PhoneField
              label='Phone Number'
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value);
                if (phoneError) setPhoneError('');
              }}
              error={!!phoneError}
              message={phoneError}
              defaultCountry='IN'
            />

            <Button type='submit' className='w-full bg-primary text-primary-foreground' disabled={isLoading}>
              {isLoading ? 'Sending Code...' : 'Send Code'}
            </Button>
          </form>
        </div>
      );
    }

    // OTP verification
    return (
      <div className='space-y-6'>
        <button
          onClick={() => setShowOtpStep(false)}
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </button>

        <div className='text-center space-y-2'>
          <Typography variant='h3' align='center' className='text-foreground'>
            Verify your mobile
          </Typography>
          <Typography variant='body2' align='center' intent='muted'>
            Enter the code sent to
          </Typography>
          <Typography variant='body2' align='center' className='text-foreground font-medium'>
            {phoneNumber}
          </Typography>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp();
          }}
          className='space-y-6'
        >
          <div className='flex justify-center'>
            <Smartphone className='h-8 w-8 text-primary' />
          </div>

          <OTPField
            value={otp}
            onChange={setOtp}
            error={!!otpError}
            message={otpError || 'Enter the 6-digit code sent via SMS'}
          />

          <Button type='submit' className='w-full bg-primary text-primary-foreground' disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </Button>

          <div className='flex justify-center gap-4 text-sm'>
            <button type='button' onClick={() => setShowOtpStep(false)} className='text-primary hover:text-primary/80'>
              Change number
            </button>
            <button type='button' onClick={handleResendOtp} className='text-primary hover:text-primary/80'>
              Resend code
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Step 3: Success
  const renderSuccess = () => (
    <div className='space-y-6'>
      <div className='text-center space-y-6'>
        {/* Success Icon */}
        <div className='flex justify-center'>
          <div className='w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center'>
            <CheckCircle className='h-10 w-10 text-green-600 dark:text-green-400' />
          </div>
        </div>

        {/* Title and Message */}
        <div className='space-y-2'>
          <Typography variant='h3' align='center' className='text-foreground'>
            Mobile verified
          </Typography>
          <Typography variant='body2' align='center' intent='muted'>
            Your mobile number has been successfully verified
          </Typography>
          <Typography variant='body2' align='center' className='text-foreground font-medium'>
            {phoneNumber}
          </Typography>
        </div>

        {/* Continue Button */}
        <Button onClick={handleContinue} className='w-full bg-primary text-primary-foreground'>
          Continue to 2FA Setup
        </Button>
      </div>
    </div>
  );

  // Calculate sub-step progress for step 2 (Verify Mobile)
  const calculateStepProgress = (): number => {
    if (currentStep === 1) return 33; // Method Selection
    if (currentStep === 2) return 66; // Verification in progress
    return 100; // Success
  };

  return (
    <div className='space-y-6'>
      <MultiStepProgressIndicator currentStep={2} stepProgress={{ 2: calculateStepProgress() }} />

      {currentStep === 1 && renderMethodSelection()}
      {currentStep === 2 && selectedMethod === 'whatsapp' && renderWhatsAppVerification()}
      {currentStep === 2 && selectedMethod === 'sms' && renderSmsVerification()}
      {currentStep === 2 && selectedMethod === 'manual' && renderManualVerification()}
      {currentStep === 3 && renderSuccess()}
    </div>
  );
};
