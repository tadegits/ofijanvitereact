import React from 'react';
import './plate.scss';
const LNavigationButtons = ({ handlePreviousClick, handleFinishAttempt, handleNextClick, selectedQuestionIndex, length }) => (
  <div className="navigation_buttons">
    <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
      Previous
    </button>
 
    <>
    {selectedQuestionIndex!=length? (<button onClick={handleNextClick} disabled={selectedQuestionIndex == length}>
      Next
    </button>
    )
    
    :
    
    ( 
    
    <button onClick={handleFinishAttempt} disabled={selectedQuestionIndex!=length}>Finish Attempt</button>
    
    )}
      
   </>
    
  </div>
);

export default LNavigationButtons;
