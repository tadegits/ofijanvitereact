import React from 'react';
import './plate.scss';
const NavigationButtons = ({ handlePreviousClick, handleNextClick, selectedQuestionIndex }) => (
  <div className="navigation_buttons">
    <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
      Previous
    </button>
   
    <button onClick={handleNextClick} disabled={selectedQuestionIndex === 4}>
      Next
    </button>
  </div>
);

export default NavigationButtons;
