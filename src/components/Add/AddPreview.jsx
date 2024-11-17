import React, { useState, useEffect } from 'react';
import './AddPriview.scss';

const AdPreview = () => {
  const [isPreview, setIsPreview] = useState(true); // Initially, show the preview placeholder
  const [adContent, setAdContent] = useState(null); // Will hold the real ad content

  // Simulate fetching the actual ad content after a delay
  useEffect(() => {
    setTimeout(() => {
      setAdContent({
        title: 'Special Offer!',
        description: 'Get 20% off on your next purchase.',
        imageUrl: 'https://via.placeholder.com/150',
        link: '/promo'
      });
      setIsPreview(false); // Switch from preview to actual ad
    }, 3000); // 3-second delay to simulate loading
  }, []);

  return (
    <div className="ad-container">
      {isPreview ? (
        // Ad preview layout with placeholder content
        <div className="ad-preview">
          <div className="ad-image-placeholder"></div>
          <div className="ad-content-placeholder">
            <div className="ad-title-placeholder"></div>
            <div className="ad-description-placeholder"></div>
          </div>
        </div>
      ) : (
        // Actual ad content
        <a href={adContent.link} className="ad-content">
          <img src={adContent.imageUrl} alt="Ad" className="ad-image" />
          <div className="ad-text">
            <h3>{adContent.title}</h3>
            <p>{adContent.description}</p>
          </div>
        </a>
      )}
    </div>
  );
};

export default AdPreview;
