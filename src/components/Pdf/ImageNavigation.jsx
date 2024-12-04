import React from 'react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const ImageNavigation = ({ currentImageIndex, id, totalImages, onNext, onPrev, onNavigate }) => {
  const navigate = useNavigate();
  const renderNavigationButtons = () => {
    const rangeSize = 3; // Number of buttons before and after the current index
    const startIndex = Math.max(0, currentImageIndex - rangeSize);
    const endIndex = Math.min(totalImages - 1, currentImageIndex + rangeSize);
    
    const buttons = [];
    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => onNavigate(i)}
          style={{
            margin: '0 4px',
            backgroundColor: currentImageIndex === i ? '#1890ff' : '#f0f0f0',
            color: currentImageIndex === i ? '#fff' : '#000',
            borderColor: currentImageIndex === i ? '#1890ff' : '#d9d9d9',
          }}
        >
          {i + 2}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '16px' }}>

      <Button
        onClick={onPrev}
        disabled={currentImageIndex === 0}
        style={{ marginRight: '8px' }}
      >
        Previous
      </Button>

      {renderNavigationButtons()}

      <Button
        onClick={onNext}
        disabled={currentImageIndex === totalImages - 1}
        style={{ marginLeft: '8px' }}
      >
        Next
      </Button>

      <p style={{ marginTop: '8px' }}>
        Viewing Image {currentImageIndex + 1} of {totalImages}
      </p>
    </div>
  );
};

export default ImageNavigation;
