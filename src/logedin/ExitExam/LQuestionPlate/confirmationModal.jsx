import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmationModal = ({ isOpen, onClose, examData }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal" onKeyDown={handleKeyDown} tabIndex="0">
              <button className="modal-close-btn" onClick={onClose}>
                &times;
              </button>
              <h2>Confirmation Page</h2>
              <p>Please review your answers before submitting:</p>
              <ul>
                {examData.map((data, index) => (
                  <li key={data.questionId}>
                    Question {index + 1}: {data.answer}
                  </li>
                ))}
              </ul>
              <button onClick={onClose}>Close</button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ConfirmationModal;
