import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from '@vritti/quantum-ui/AuthProvider';
import { AuthLayout } from './components/layouts/AuthLayout';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { MFASetupFlowPage } from './pages/onboarding/MFASetupFlowPage';
import { SetPasswordPage } from './pages/onboarding/SetPasswordPage';
import { VerifyEmailPage } from './pages/onboarding/VerifyEmailPage';
import { VerifyMobileFlowPage } from './pages/onboarding/VerifyMobileFlowPage';
import { VerifyOTPPage } from './pages/onboarding/VerifyOTPPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'onboarding',
        children: [
          {
            path: 'verify-email',
            element: <VerifyEmailPage />,
          },
          {
            path: 'verify-mobile',
            element: <VerifyMobileFlowPage />,
          },
          {
            path: 'verify-otp',
            element: <VerifyOTPPage />,
          },
          {
            path: 'set-password',
            element: <SetPasswordPage />,
          },
          {
            path: 'mfa-setup',
            element: <MFASetupFlowPage />,
          },
        ],
      },
    ],
  },
]);
