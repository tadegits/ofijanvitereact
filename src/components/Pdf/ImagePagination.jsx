import React from 'react';
import { Button } from 'antd';

const ImagePagination = ({ totalImages, currentIndex, onImageClick }) => {
  const rangeSize = 3;
  const startIndex = Math.max(0, currentIndex - rangeSize);
  const endIndex = Math.min(totalImages - 1, currentIndex + rangeSize);

  const buttons = [];
  if (startIndex > 0) {
    buttons.push(<Button key="first" onClick={() => onImageClick(0)}>1</Button>);
    if (startIndex > 1) buttons.push(<span key="ellipsis-start">...</span>);
  }

  for (let i = startIndex; i <= endIndex; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => onImageClick(i)}
        style={{
          margin: '0 4px',
          backgroundColor: currentIndex === i ? '#1890ff' : '#f0f0f0',
          color: currentIndex === i ? '#fff' : '#000',
        }}
      >
        {i + 1}
      </Button>
    );
  }

  if (endIndex < totalImages - 1) {
    if (endIndex < totalImages - 2) buttons.push(<span key="ellipsis-end">...</span>);
    buttons.push(
      <Button key="last" onClick={() => onImageClick(totalImages - 1)}>
        {totalImages}
      </Button>
    );
  }

  return <div style={{ marginTop: '16px' }}>{buttons}</div>;
};

export default ImagePagination;
