import { Field, FieldGroup, FieldLabel, Form } from '@vritti/quantum-ui/Form';
import { Button } from '@vritti/quantum-ui/Button';
import { OTPField } from '@vritti/quantum-ui/OTPField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { OTPFormData } from '../../schemas/auth';
import { otpSchema } from '../../schemas/auth';
import { mapApiErrorsToForm } from '../../utils/formHelpers';
import { MultiStepProgressIndicator } from '../../components/onboarding/MultiStepProgressIndicator';

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [email] = useState('user@example.com'); // TODO: Get from signup state

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: OTPFormData) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Email verified with OTP:', data.code);
      navigate('/onboarding/verify-mobile');
    } catch (error) {
      console.error('Verification failed', error);
      mapApiErrorsToForm(form, error);
    }
  };

  const handleResend = async () => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resending verification code to:', email);
      form.reset();
    } catch (error) {
      console.error('Failed to resend code', error);
      form.setError('root', {
        type: 'manual',
        message: 'Failed to resend code. Please try again.',
      });
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

      <Form form={form} onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel className="sr-only">Verification Code</FieldLabel>
            <OTPField
              name="code"
              onChange={(value) => {
                if (value.length === 6) {
                  form.handleSubmit(onSubmit)();
                }
              }}
            />
            <Typography variant="body2" intent="muted" className="text-center mt-2">
              Enter the 6-digit verification code
            </Typography>
          </Field>

          <Field>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </Field>

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
        </FieldGroup>
      </Form>
    </div>
  );
};
