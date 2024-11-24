import React, { useState, useEffect } from 'react';
import { Button, Spin, Image, Input, List, Modal } from 'antd';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import './ImageGallery.scss';

const ImageGallery = ({ id }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [showOcrModal, setShowOcrModal] = useState(false);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/fetchimages/${id}`);
        const urls = response.data.map((fileName) => `/images/${id}/${fileName}`);
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
    setCurrentImageIndex(index);
  };

  const handleOcrExtract = () => {
    const currentImageUrl = imageUrls[currentImageIndex];
    setOcrLoading(true);
    setShowOcrModal(true);
    setOcrText(''); // Clear previous OCR result

    Tesseract.recognize(currentImageUrl, 'eng', {
      logger: (info) => console.log(info), // Optional: To see progress
    })
      .then(({ data: { text } }) => {
        setOcrText(text);
      })
      .catch((error) => {
        console.error('Error extracting text:', error);
        setOcrText('Failed to extract text. Please try again.');
      })
      .finally(() => {
        setOcrLoading(false);
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section style={{ textAlign: 'center' }}>
      {imageUrls.length > 0 && (
        <article>
          <Image
            src={imageUrls[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => handleImageClick(currentImageIndex - 1)} disabled={currentImageIndex === 0}>
              Previous
            </Button>
            <Button onClick={() => handleImageClick(currentImageIndex + 1)} disabled={currentImageIndex === imageUrls.length - 1}>
              Next
            </Button>
          </div>
          <p>Viewing Image {currentImageIndex + 1} of {imageUrls.length}</p>

          {/* OCR Button */}
          <Button type="primary" onClick={handleOcrExtract} style={{ marginTop: '16px' }}>
            Show Answer
          </Button>

          {/* OCR Modal */}
          <Modal
            title="Extracted Text"
            visible={showOcrModal}
            onCancel={() => setShowOcrModal(false)}
            footer={null}
          >
            {ocrLoading ? (
              <Spin size="large" />
            ) : (
              <p>{ocrText || 'No text detected.'}</p>
            )}
          </Modal>
        </article>
      )}
    </section>
  );
};

export default ImageGallery;
