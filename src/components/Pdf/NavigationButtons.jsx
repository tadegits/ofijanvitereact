import React from 'react';
import { Button } from 'antd';

const NavigationButtons = ({ onNext, onPrevious, isNextDisabled, isPreviousDisabled }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <Button onClick={onPrevious} disabled={isPreviousDisabled} style={{ marginRight: '8px' }}>
        Previous
      </Button>
      <Button onClick={onNext} disabled={isNextDisabled}>
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
