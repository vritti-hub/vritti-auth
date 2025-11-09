import { Field, FieldGroup, Form } from '@vritti/quantum-ui/Form';
import { Button } from '@vritti/quantum-ui/Button';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { TextField } from '@vritti/quantum-ui/TextField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { SignupFormData } from '../../schemas/auth';
import { signupSchema } from '../../schemas/auth';
import { mapApiErrorsToForm } from '../../utils/formHelpers';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';

export const SignupPage: React.FC = () => {
  // const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({ control: form.control, name: 'password' }) || '';

  const onSubmit = async (data: SignupFormData) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Signup successful', data);
      // navigate('/onboarding/mobile');
    } catch (error) {
      console.error('Signup failed', error);
      mapApiErrorsToForm(form, error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Typography variant="h3" align="center" className="text-foreground">
          Create your account
        </Typography>
        <Typography variant="body2" align="center" intent="muted">
          Get started with Vritti Cloud Platform
        </Typography>
      </div>

      {/* Form */}
      <Form form={form} onSubmit={onSubmit}>
        <FieldGroup>
          {/* First Name and Last Name - Side by side */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              name="firstName"
              label="First Name"
              placeholder="John"
              startAdornment={<User className="h-3.5 w-3.5 text-muted-foreground" />}
            />

            <TextField
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              startAdornment={<User className="h-3.5 w-3.5 text-muted-foreground" />}
            />
          </div>

          {/* Work Email */}
          <TextField
            name="email"
            label="Work Email"
            type="email"
            placeholder="you@company.com"
            startAdornment={<Mail className="h-3.5 w-3.5 text-muted-foreground" />}
          />

          {/* Password */}
          <PasswordField
            name="password"
            label="Password"
            placeholder="password"
            startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            showStrengthIndicator
          />

          {/* Confirm Password */}
          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="password"
            startAdornment={<Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            showMatchIndicator
            matchPassword={password}
          />

          {/* Submit Button */}
          <Field>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Field>

          {/* Terms and Conditions */}
          <Typography variant="body2" align="center" intent="muted" className="text-center">
            By creating an account, you agree to our{' '}
            <button type="button" className="text-primary hover:text-primary/80 underline">
              Terms
            </button>{' '}
            &{' '}
            <button type="button" className="text-primary hover:text-primary/80 underline">
              Privacy
            </button>
          </Typography>
        </FieldGroup>
      </Form>

      {/* Divider */}
      <AuthDivider />

      {/* Social Auth */}
      <SocialAuthButtons />

      {/* Footer */}
      <div className="text-center">
        <Typography variant="body2" align="center" intent="muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in
          </Link>
        </Typography>
      </div>
    </div>
  );
};
