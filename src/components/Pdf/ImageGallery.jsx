import React, { useState, useEffect } from 'react';
import { Button, Spin, Image } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';

const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/images/1`);
                setImageUrls(response.data);
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImageUrls();
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/singleimage/1/${imageUrls[currentImageIndex]}`);
                setImageData(response.data);
            } catch (error) {
                console.error('Error fetching image:', error);
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

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <Button onClick={handlePrevImage} style={{ marginRight: '8px' }}>
                    Previous
                </Button>
                <Button onClick={handleNextImage}>Next</Button>
            </div>
            <div style={{ textAlign: 'center' }}>
                {imageData ? (
                    <img src={imageData} alt={imageData} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;
