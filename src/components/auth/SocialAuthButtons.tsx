import { Button } from '@vritti/quantum-ui/Button';
import { Apple, Chrome, Linkedin } from 'lucide-react';
import React from 'react';

interface SocialButtonProps {
  provider: 'google' | 'microsoft' | 'apple' | 'linkedin';
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick }) => {
  const providerConfig = {
    google: {
      icon: <Chrome className="h-4 w-4" />,
      label: 'Google',
    },
    microsoft: {
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 0h7.5v7.5H0V0zm8.5 0H16v7.5H8.5V0zM0 8.5h7.5V16H0V8.5zm8.5 0H16V16H8.5V8.5z" />
        </svg>
      ),
      label: 'Microsoft',
    },
    apple: {
      icon: <Apple className="h-4 w-4" />,
      label: 'Apple',
    },
    linkedin: {
      icon: <Linkedin className="h-4 w-4" />,
      label: 'LinkedIn',
    },
  };

  const config = providerConfig[provider];

  return (
    <Button
      variant="outline"
      className="w-full bg-secondary text-foreground border-border hover:bg-secondary/80"
      onClick={onClick}
    >
      <span className="flex items-center justify-center gap-2">
        {config.icon}
        <span className="text-sm font-medium">{config.label}</span>
      </span>
    </Button>
  );
};

export const SocialAuthButtons: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement OAuth flow
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <SocialButton provider="google" onClick={() => handleSocialLogin('google')} />
      <SocialButton provider="microsoft" onClick={() => handleSocialLogin('microsoft')} />
      <SocialButton provider="apple" onClick={() => handleSocialLogin('apple')} />
      <SocialButton provider="linkedin" onClick={() => handleSocialLogin('linkedin')} />
    </div>
  );
};
