import React, { useState, useEffect } from 'react';
import { Button, Spin, Image } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import { selectUser, setRedirectUrl } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ImageGallery = ({ id }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/fetchimages/${id}`);
        const fileNames = response.data;
        const urls = Array.isArray(fileNames)
          ? fileNames.map((fileName) => `${API_BASE_URL}/images/${id}/${fileName}`)
          : Object.entries(fileNames).map(([key, value]) => `${API_BASE_URL}/images/${value}`);

        setImageUrls(urls);
        setCurrentImageIndex(0);
      } catch (error) {
        setError(error);
        console.error('Error fetching image URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, [id]);

  const handleImageClick = (index) => {
    if (!isLoggedIn && index >= 10) {
      handleLoginPrompt();
    } else {
      setCurrentImageIndex(index);
    }
  };

  const handleLoginPrompt = () => {
    Swal.fire({
      text: 'Login to view more images!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Login Now',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setRedirectUrl(window.location.pathname));
        navigate('/Login');
      }
    });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {imageUrls.length > 0 && (
        <div style={{ margin: '16px 0' }}>
          <Image
            src={imageUrls[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
          <div style={{ marginTop: '16px' }}>
            {imageUrls.map((_, index) => (
              <Button
                key={index}
                onClick={() => handleImageClick(index)}
                disabled={!isLoggedIn && index >= 10}
                style={{
                  margin: '0 4px',
                  backgroundColor: currentImageIndex === index ? '#1890ff' : '#f0f0f0',
                  color: currentImageIndex === index ? '#fff' : '#000',
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <p style={{ marginTop: '8px' }}>
            Viewing Image {currentImageIndex + 1} of {imageUrls.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
