import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import API_BASE_URL from '../../Globals/apiConfig';
import ImageViewer from './ImageViewer';
import NavigationButtons from './NavigationButtons';
import ImagePagination from './ImagePagination';
import CommentsSection from './CommentsSection';
import SocialShare from './ImageSharing';
import GeneralKnowledge from './GeneralKnowledge';
const ImageGallery = ({ id, imageIndex }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        // Safely parse and update currentImageIndex
        const parsedIndex = parseInt(imageIndex, 10);
        if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < urls.length) {
          setCurrentImageIndex(parsedIndex);
        } else {
          // Fallback if the initial index is invalid
          setCurrentImageIndex(0); // Or set to the first image
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImageUrls();
  }, [id, imageIndex]);

  const handleImageClick = (index) => {
    if (index >= 0 && index < imageUrls.length) {
      setCurrentImageIndex(index);
      navigate(`/exit-exam/${id}/${index}`);
    }
  };

  const handleNextImage = () => {
    let nextIndex = currentImageIndex + 1;
    if (nextIndex >= imageUrls.length) {
      nextIndex = 0; // Loop back to the first image, or set to a different behavior.
    }
    handleImageClick(nextIndex);
  };

  const handlePrevImage = () => {
    let prevIndex = currentImageIndex - 1;
    if (prevIndex < 0) {
      prevIndex = imageUrls.length - 1; // Loop back to the last image, or set to a different behavior.
    }
    handleImageClick(prevIndex);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section style={{ textAlign: 'center' }}>
      <Helmet>
        <title>{id} | Image Gallery</title>
      </Helmet>
    
      <ImageViewer
        imageUrl={imageUrls[currentImageIndex]}
        altText={`Image ${currentImageIndex + 1}`}
      />
      <div><ins class="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-8449765590756444"
     data-ad-slot="6577167626"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins></div>
      <NavigationButtons
        onNext={handleNextImage}
        onPrevious={handlePrevImage}
        isNextDisabled={currentImageIndex === imageUrls.length - 1}
        isPreviousDisabled={currentImageIndex === 0}
      />
      <ImagePagination
        totalImages={imageUrls.length}
        currentIndex={currentImageIndex}
        onImageClick={handleImageClick}
      />
      
      <SocialShare
        id={id}
        currentImageIndex={currentImageIndex}
        currentImageUrl={imageUrls[currentImageIndex]}
      />
      <CommentsSection />
    </section>
  );
};

export default ImageGallery;
