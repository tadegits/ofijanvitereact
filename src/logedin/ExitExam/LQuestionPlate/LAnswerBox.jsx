import React from 'react';
import './plate.scss';

const LAnswerBox = ({ 
  index, 
  isSelected, 
  isFlagged, 
  isAnswered, 
  handleClick,  
  handleSweetAlert,
  isLoggedIn
}) => {

  const handleBoxClick = () => {
    handleClick(index);
    
   
    if (!isLoggedIn && index > 4 && handleSweetAlert) {
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
