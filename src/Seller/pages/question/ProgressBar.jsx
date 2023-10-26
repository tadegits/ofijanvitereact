import React from 'react';
import './question.scss';
const ProgressBar = ({ totalSteps, currentStep }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;