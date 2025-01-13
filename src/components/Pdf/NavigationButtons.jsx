import React from 'react';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const NavigationButtons = ({ onNext, onPrevious, isNextDisabled, isPreviousDisabled, isLoggedIn, currentImageIndex, totalImages }) => {
  const maxViewsForGuest = 10; // Limit for non-logged-in users
const navigate = useNavigate();
  const handleNext = () => {
    if (!isLoggedIn && currentImageIndex >= maxViewsForGuest) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to log in to continue navigating.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('User chose to log in');
          navigate('/login');
        } else if (result.isDismissed) {
          console.log('User canceled');
        }
      });
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (!isLoggedIn && currentImageIndex >= maxViewsForGuest) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to log in to continue navigating.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('User chose to log in');
          // Logic to redirect to login page or handle login
        } else if (result.isDismissed) {
          console.log('User canceled');
        }
      });
    } else {
      onPrevious();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <Button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        style={{ marginRight: '8px' }}
      >
        Previous
      </Button>
      <Button onClick={handleNext} disabled={isNextDisabled}>
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
