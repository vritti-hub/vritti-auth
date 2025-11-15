/**
 * Onboarding Service
 *
 * Centralized exports for all onboarding-related API services
 */

export {
  register,
  verifyEmail,
  resendEmailOtp,
  getStatus,
} from './onboarding.service';

export type {
  RegisterDto,
  OnboardingStatusResponse,
  VerifyEmailDto,
} from './onboarding.service';
