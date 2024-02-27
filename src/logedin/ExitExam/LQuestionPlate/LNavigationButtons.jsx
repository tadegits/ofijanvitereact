import React from 'react';
import './plate.scss';
const LNavigationButtons = ({ handlePreviousClick, handleNextClick, selectedQuestionIndex, length }) => (
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
    
    <button onClick={handleNextClick} disabled={selectedQuestionIndex!=length}>finish Attempt</button>
    
    )}
      
   </>
    
  </div>
);

export default LNavigationButtons;
