import React from 'react';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ImagePagination = ({ totalImages, currentIndex, onImageClick, isLoggedIn }) => {
  const rangeSize = 3;
  const maxImagesForGuest = 10; 
  const navigate = useNavigate();
  const startIndex = Math.max(0, currentIndex - rangeSize);
  const endIndex = Math.min(totalImages - 1, currentIndex + rangeSize);

  const handleImageClick = (index) => {
    if (!isLoggedIn && index >= maxImagesForGuest) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to log in to view more images.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
          console.log('User chose to log in');
        } else if (result.isDismissed) {
          console.log('User canceled');
        }
      });
    } else {
      onImageClick(index);
    }
  };

  const buttons = [];
  if (startIndex > 0) {
    buttons.push(
      <Button key="first" onClick={() => handleImageClick(0)}>
        1
      </Button>
    );
    if (startIndex > 1) buttons.push(<span key="ellipsis-start">...</span>);
  }

  for (let i = startIndex; i <= endIndex; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => handleImageClick(i)}
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
      <Button key="last" onClick={() => handleImageClick(totalImages - 1)}>
        {totalImages}
      </Button>
    );
  }

  return <div style={{ marginTop: '16px' }}>{buttons}</div>;
};

export default ImagePagination;
