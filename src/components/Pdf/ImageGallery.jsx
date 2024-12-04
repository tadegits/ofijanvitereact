import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Fetch the list of image filenames
    axios.get(`/fetchimages/Animal-Science`)
      .then(response => {
        setImages(response.data);  // Assuming the API returns an array of image filenames
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [deptId]);

  const fetchImageUrl = (filename) => {
    return `/images/${deptId}/${filename}`;
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (images.length === 0) {
    return <div>No images available for this department.</div>;
  }

  return (
    <div>
      <div className="image-container">
        <img
          src={fetchImageUrl(images[currentIndex])}
          alt={`Image ${currentIndex + 1}`}
          loading="lazy"  // Lazy load image
        />
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <span>
          {currentIndex + 1} / {images.length}
        </span>
        <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
