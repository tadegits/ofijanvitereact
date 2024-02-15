import React, { useState, useEffect } from 'react';

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imageFolder = './../../assets/Jouralism';
    const imagePaths = require.context(imageFolder, true, /\.(png|jpg|jpeg)$/);

    setImages(imagePaths.keys().map((path) => imagePaths(path)));
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <img src={images[currentIndex]} alt="" />
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default ImageSlider;