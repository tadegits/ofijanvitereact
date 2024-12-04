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
        setCurrentImageIndex(imageIndex);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImageUrls();
  }, [id, imageIndex]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    navigate(`/exit-exam/${id}/${index}`);
  };

  const handleNextImage = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      handleImageClick(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      handleImageClick(currentImageIndex - 1);
    }
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
