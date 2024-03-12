import React, { useState } from 'react';
import './plate.scss';
import './studyplate.scss'
import './confirmationModal.scss';
import { useNavigate } from 'react-router-dom';

const StudyNavButtons = ({ handlePreviousClick, handleFinishAttempt, handleNextClick, selectedQuestionIndex, length }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSpinningModal, setShowSpinningModal] = useState(false);
const navigate = useNavigate();
  const handleFinishAttemptConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleFinishAttemptConfirmed = () => {

    setShowConfirmationModal(false);
    
    setShowSpinningModal(true);

    handleFinishAttempt();
    setTimeout(() => {
      navigate('../my_results');
      setShowSpinningModal(false);
    }, 2000);
  };

  return (
    <div className="navigation_buttons">
      <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
        Previous
      </button>
      {selectedQuestionIndex !== length ? (
        <button onClick={handleNextClick} disabled={selectedQuestionIndex === length}>
          Next
        </button>
      ) : (
        <button onClick={handleFinishAttemptConfirmation} disabled={selectedQuestionIndex !== length}>
          Finish Attempt
        </button>
      )}
      
      {showConfirmationModal && (
        <div className="confirmation_modal">
          <p>Are you sure you want to submit?</p>
          <button onClick={handleFinishAttemptConfirmed}>Confirm</button>
          <button onClick={handleCloseConfirmationModal}>Close</button>
        </div>
      )}

      {showSpinningModal && (
        <div className="spinning_modal">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StudyNavButtons;
