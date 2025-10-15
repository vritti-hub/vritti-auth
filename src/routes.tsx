import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { EnterMobilePage } from './pages/onboarding/EnterMobilePage';
import { MFASelectionPage } from './pages/onboarding/MFASelectionPage';
import { SetPasswordPage } from './pages/onboarding/SetPasswordPage';
import { SetupAuthenticatorPage } from './pages/onboarding/SetupAuthenticatorPage';
import { SetupPasskeyPage } from './pages/onboarding/SetupPasskeyPage';
import { VerifyOTPPage } from './pages/onboarding/VerifyOTPPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
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
            path: 'mobile',
            element: <EnterMobilePage />,
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
            path: 'mfa-selection',
            element: <MFASelectionPage />,
          },
          {
            path: 'setup-authenticator',
            element: <SetupAuthenticatorPage />,
          },
          {
            path: 'setup-passkey',
            element: <SetupPasskeyPage />,
          },
        ],
      },
    ],
  },
]);
