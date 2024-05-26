import React, { useState, useEffect } from 'react';
import { Button, Spin, Image } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';

const ImageGallery = ({id}) => {
  const [imageUrls, setImageUrls] = useState([]); // Track full image URLs
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null); // Add error state

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
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageUrls.length) return; // Avoid unnecessary requests

      try {
        setLoading(true);
        const url = imageUrls[currentImageIndex];
        const response = await axios.get(url, {
          responseType: 'blob',
          headers: {
            'Accept': 'image/*', 
          },
        });
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

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display error message
  }

  return (
    <div>
      
      <div style={{ textAlign: 'center' }}>
        <Image
          src={imageData}
          alt="Image not found"
          style={{ maxWidth: '100%', maxHeight: '80vh' }}
        />
      </div>
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



