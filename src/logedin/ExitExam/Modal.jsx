import React from 'react';
import { Link } from 'react-router-dom';
import './modal.scss';

const Modal = ({ examID, onClose }) => {
  const handleTestMyself = () => {
    console.log("Test Myself");
  };

  const handleStudyMore = () => {
    console.log("Study More");
  };
  const [isOpen, setIsOpen] = React.useState(true);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="card-container">
          <div className="exam-description">
            <h3>Exam Description</h3>
            <p>Here you can provide a brief description of the exam with details such as exam name, total number of questions, topics covered, etc.</p>
          </div>
          <h2>What do you want to do with this exam?</h2>
          <div className="combined-card">
          <Link to={`/ofijan_exam_plate/testmode/${examID}`} className="card positive">
              <h4>Test Myself</h4>
              <p>Take a practice exam to see how well you know the material.</p>
            </Link>
            <Link to={`/ofijan_question_platel/${examID}`} className="card negative">
              <div onClick={handleStudyMore}>
                <h4>Study More</h4>
                <p>Review the material and learn more before taking the exam.</p>
              </div>
            </Link>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
