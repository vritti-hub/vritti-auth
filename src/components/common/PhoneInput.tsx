import { TextField } from '@vritti/quantum-ui/TextField';
import { Phone } from 'lucide-react';
import React from 'react';

interface PhoneInputProps extends React.ComponentProps<typeof TextField> {
  label?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ label = 'Phone Number', ...props }) => {
  return (
    <TextField
      label={label}
      type="tel"
      placeholder="+1 (555) 000-0000"
      startAdornment={<Phone className="h-3.5 w-3.5 text-muted-foreground" />}
      {...props}
    />
  );
};
