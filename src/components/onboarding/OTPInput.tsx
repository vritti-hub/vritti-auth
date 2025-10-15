import React, { useRef, useState } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange, error }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/[^0-9]/g, '');

    if (digit.length > 1) {
      // Handle paste
      const digits = digit.slice(0, length);
      onChange(digits);

      // Focus the next empty field or the last field
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Update the value
    const newValue = value.split('');
    newValue[index] = digit;
    onChange(newValue.join('').slice(0, length));

    // Move to next input if digit was entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Select the content for easy replacement
    inputRefs.current[index]?.select();
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          className={`
            w-12 h-12 text-center text-lg font-semibold
            border rounded-lg
            bg-card text-foreground
            focus:outline-none focus:ring-2
            transition-all
            ${
              error
                ? 'border-destructive focus:ring-destructive'
                : focusedIndex === index
                ? 'border-primary ring-2 ring-primary'
                : 'border-input focus:ring-primary'
            }
          `}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};
