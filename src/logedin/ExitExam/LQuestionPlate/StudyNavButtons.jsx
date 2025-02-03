import React, { useState } from 'react';
import './plate.scss';
import './studyplate.scss';
import './confirmationModal.scss';
import { useNavigate } from 'react-router-dom';

const StudyNavButtons = ({ 
  handlePreviousClick, 
  handleFinishAttempt, 
  isLoggedIn, 
  handleNextClick, 
  selectedQuestionIndex, 
  length,
  handleSweetAlert 
}) => {
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
      {/* Previous Button */}
      <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
        Previous
      </button>

      {/* Next Button or SweetAlert Trigger */}
      {selectedQuestionIndex < length - 1 ? (
        !isLoggedIn && selectedQuestionIndex > 4 ? (
          <button onClick={() => handleSweetAlert(5)} >Next</button>
        ) : (
          <button onClick={handleNextClick}>Next</button>
        )
      ) : (
        // Finish Attempt Button at the Last Question
        <button onClick={handleFinishAttemptConfirmation}>
          Finish Attempt
        </button>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation_modal">
          <p>Are you sure you want to submit?</p>
          <button onClick={handleFinishAttemptConfirmed}>Confirm</button>
          <button onClick={handleCloseConfirmationModal}>Close</button>
        </div>
      )}

      {/* Spinning Modal (Loading) */}
      {showSpinningModal && (
        <div className="spinning_modal">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StudyNavButtons;
