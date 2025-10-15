import { TextField } from '@vritti/quantum-ui/TextField';
import { Mail } from 'lucide-react';
import React from 'react';

interface EmailFieldProps extends React.ComponentProps<typeof TextField> {
  label?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ label = 'Email', ...props }) => {
  return (
    <TextField
      label={label}
      type="email"
      placeholder="you@company.com"
      startAdornment={
        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
      }
      {...props}
    />
  );
};
