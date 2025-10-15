import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps = 6 }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
