import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@vritti/quantum-ui/Button';
import { Field, FieldGroup, FieldLabel, Form } from '@vritti/quantum-ui/Form';
import { PasswordField } from '@vritti/quantum-ui/PasswordField';
import { TextField } from '@vritti/quantum-ui/TextField';
import { Typography } from '@vritti/quantum-ui/Typography';
import { Lock, Mail } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';
import type { LoginFormData } from '../../schemas/auth';
import { loginSchema } from '../../schemas/auth';
import { mapApiErrorsToForm } from '../../utils/formHelpers';

export const LoginPage: React.FC = () => {
  // const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login successful', data);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      mapApiErrorsToForm(form, error);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='text-center space-y-2'>
        <Typography variant='h3' align='center' className='text-foreground'>
          Welcome back
        </Typography>
        <Typography variant='body2' align='center' intent='muted'>
          Sign in to your Vritti Cloud account
        </Typography>
      </div>

      {/* Form */}
      <Form form={form} onSubmit={onSubmit} csrfEndpoint="/csrf/token">
        <FieldGroup>
          <TextField
            name='email'
            label='Email'
            placeholder='Enter your email'
            startAdornment={<Mail className='h-4 w-4 text-muted-foreground' />}
          />

          <Field>
            <div className='flex items-center justify-between'>
              <FieldLabel>Password</FieldLabel>
              <Link to='/forgot-password' className='text-sm text-primary hover:text-primary/80'>
                Forgot?
              </Link>
            </div>
            <PasswordField
              name='password'
              placeholder='Enter your password'
              startAdornment={<Lock className='h-3.5 w-3.5 text-muted-foreground' />}
            />
          </Field>

          <Field>
            <Button
              type='submit'
              className='w-full bg-primary text-primary-foreground'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </Field>
        </FieldGroup>
      </Form>

      {/* Divider */}
      <AuthDivider />

      {/* Social Auth */}
      <SocialAuthButtons />

      {/* Footer */}
      <div className='text-center'>
        <Typography variant='body2' align='center' intent='muted'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-primary hover:text-primary/80 font-medium'>
            Create one
          </Link>
        </Typography>
      </div>
    </div>
  );
};
