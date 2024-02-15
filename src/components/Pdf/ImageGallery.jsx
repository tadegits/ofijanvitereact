import React, { useState, useEffect } from 'react';
import { Button, Spin, Image, Carousel } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';

const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState([]); // Track full image URLs
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/fetchimages`);
        const fileNames = response.data; // Assuming the API returns filenames

        // Handle potential array-like structures if received instead of string array
        const urls = Array.isArray(fileNames)
          ? fileNames.map((fileName) => `${API_BASE_URL}/images/${fileName}`)
          : Object.entries(fileNames).map(([key, value]) => `${API_BASE_URL}/images/${value}`);

        setImageUrls(urls);
        setCurrentImageIndex(0); // Reset index on new data
      } catch (error) {
        setError(error);
        console.error('Error fetching image URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageUrls.length) return; // Avoid unnecessary requests

      try {
        setLoading(true);
        const url = imageUrls[currentImageIndex];

        // Request headers specific to image loading (optional)
        const response = await axios.get(url, {
          responseType: 'blob', // Ensure binary data
          headers: {
            'Accept': 'image/*', // Accept any image type
          },
        });

        // Create URL from response data for consistent image source
        const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageSrc = URL.createObjectURL(imageBlob);

        setImageData(imageSrc);
      } catch (error) {
        setError(error);
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [currentImageIndex, imageUrls]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display error message
  }

  return (
    <div onKeyDown={handleKeyPress} tabIndex="0"> {/* Enable keyboard events */}
      <Carousel>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <div style={{ textAlign: 'center' }}>
              <Image
                src={url}
                alt="Downloaded Image"
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Button onClick={handlePrevImage} style={{ marginRight: '8px' }}>
          Previous
        </Button>
        <Button onClick={handleNextImage}>Next</Button>
      </div>
    </div>
  );
};

export default ImageGallery;
