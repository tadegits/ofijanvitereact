import React from 'react';
import './plate.scss';

const LAnswerBox = ({ 
  index, 
  isSelected, 
  isFlagged, 
  isAnswered, 
  handleClick,  
  handleSweetAlert 
}) => {

  const handleBoxClick = () => {
    handleClick(index);
    
    // Trigger SweetAlert after the 5th question
    if (index > 4 && handleSweetAlert) {
      handleSweetAlert(5);
    }
  };

  return (
    <div
      className={`answer_box_holderl 
        ${isSelected ? 'selected' : ''} 
        ${isFlagged ? 'flagged' : ''} 
        ${isAnswered ? 'answered' : ''}`
      }
      onClick={handleBoxClick}
    >
      <div className="answer_box">{index + 1}</div>
      <div className={`answer_box ${isSelected ? 'selected' : ''} ${isAnswered ? 'answered' : ''}`} />
    </div>
  );
};

export default LAnswerBox;
