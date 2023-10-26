import React from 'react';
import './question.scss';
const Step = ({ step, currentStep }) => {
  const isActive = step === currentStep;
  return (
    <div className={`step ${isActive ? 'active' : ''}`}>
      {step}
    </div>
  );
};

export default Step;