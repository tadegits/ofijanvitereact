import React, { useState, useEffect } from 'react';
import { Button, Spin, Image, Input, List } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import { selectUser, setRedirectUrl } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { FaTelegram } from "react-icons/fa";
import './ImageGallery.scss';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import AdComponent from '../Add/AdComponent';
import AdSenseComponent from '../AddSense/AdsenseComponent';
// import OcrComponent from './OcrComponent'; 

const ImageGallery = ({ id }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { term } = useParams();
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

  const handleNextImage = () => {
    const nextIndex = currentImageIndex + 1;
    if (nextIndex < imageUrls.length) {
      handleImageClick(nextIndex);
    }
  };

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex - 1;
    if (prevIndex >= 0) {
      handleImageClick(prevIndex);
    }
  };
  const loadAd = () => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  };
  const renderImageButtons = () => {
    const totalImages = imageUrls.length;
    const rangeSize = 3;
    const startIndex = Math.max(0, currentImageIndex - rangeSize);
    const endIndex = Math.min(totalImages - 1, currentImageIndex + rangeSize);

    const buttons = [];
    if (startIndex > 0) {
      buttons.push(
        <Button key={0} onClick={() => handleImageClick(0)}>
          1
        </Button>
      );
      if (startIndex > 1) {
        buttons.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleImageClick(i)}
          style={{
            margin: '0 4px',
            backgroundColor: currentImageIndex === i ? '#1890ff' : '#f0f0f0',
            color: currentImageIndex === i ? '#fff' : '#000',
          }}
        >
          {i + 1}
        </Button>
      );
    }

    if (endIndex < totalImages - 1) {
      if (endIndex < totalImages - 2) {
        buttons.push(<span key="ellipsis-end">...</span>);
      }
      buttons.push(
        <Button key={totalImages - 1} onClick={() => handleImageClick(totalImages - 1)}>
          {totalImages}
        </Button>
      );
    }

    return buttons;
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, user: 'User', id: comments.length }]);
      setNewComment('');
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const baseUrl = window.location.origin;
  const shareableUrl = `${baseUrl}/image-gallery/${id}?imageIndex=${currentImageIndex}`;
  const currentImageUrl = imageUrls[currentImageIndex];
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentImageUrl)}&text=Check this image!`;

  return (
    <section style={{ textAlign: 'center' }}>
      <Helmet>
        <title>{id} | 2015 Ethiopian Exit Exam | 2016 Ethiopian Exit Exam</title>
        <meta name="description" content="Explore images from the 2015 Ethiopian Exit Exam for Accounting. View study materials and enhance your learning." />
        <meta name="keywords" content="Ethiopian Exit Exam, Accounting, 2015 Exam, Study Materials, Exam Preparation" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {imageUrls.length > 0 && (
        <article style={{ margin: '16px 0' }}>
          <Image
            src={currentImageUrl}
            alt={`2015 Ethiopian Exit Exam ${id} PDF ${currentImageIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '300px' }}
            loading="lazy"
            className='imageee'
          />
           <AdSenseComponent adSlot="1234567890" adStyle={{ margin: '20px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button onClick={handlePrevImage} disabled={currentImageIndex === 0} style={{ marginRight: '8px' }}>
              Previous
            </Button>
            <Button onClick={handleNextImage} disabled={currentImageIndex === imageUrls.length - 1}>
              Next
            </Button>
          </div>
          <div style={{ marginTop: '16px' }}>
            {renderImageButtons()}
          </div>
          <p style={{ marginTop: '8px' }}>
            Viewing Image {currentImageIndex + 1} of {imageUrls.length}
          </p>



          {/* Social Media Sharing Section */}
          <div style={{ marginTop: '16px' }}>
            <h3>Share this image</h3>
            <div className="share_social">
              <FacebookShareButton url={shareableUrl} quote="Check this out!">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareableUrl} title="Check this out!">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <a href={shareableUrl} target="_blank" rel="noopener noreferrer">
                <FaTelegram size={32} round />
              </a>
            </div>
          </div>
          
          <AdSenseComponent adSlot="0987654321" adStyle={{ margin: '20px 0' }} />

          <div style={{ marginTop: '32px', textAlign: 'left' }}>
            <h3>Comments</h3>
            <List
              dataSource={comments}
              renderItem={item => (
                <List.Item key={item.id}>
                  <strong>{item.user}:</strong> {item.text}
                </List.Item>
              )}
            />
            <Input
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onPressEnter={handleCommentSubmit}
              style={{ marginTop: '8px' }}
            />
            <Button type="primary" onClick={handleCommentSubmit} style={{ marginTop: '8px' }}>
              Submit
            </Button>
            
          </div>
          {/* <OcrComponent imageUrl={currentImageUrl} /> */}
          <AdSenseComponent adSlot="1122334455" adStyle={{ margin: '20px 0' }} />
       
        </article>
      )}
    </section>
  );
};

export default ImageGallery;
