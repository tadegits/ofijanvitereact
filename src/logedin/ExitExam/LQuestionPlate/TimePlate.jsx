import React from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import './timePlate.scss';

const TimePlate = ({ timeLeft }) => {
  const isBlinking = timeLeft <= 120; // 2 minutes in seconds

  return (
    <div className="timePlate">
      <div className={`timebox2 ${isBlinking ? 'blinking' : ''}`}>
        <TimerIcon />
        Time left { `${timeLeft} sec`}
      </div>
    </div>
  );
};

export default TimePlate;
