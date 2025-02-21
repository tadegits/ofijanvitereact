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
import { selectUser } from '../../features/userSlice';
import { useSelector } from "react-redux";
const ImageGallery = ({ id, imageIndex }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("0");
  const [userFName, setUserFName] = useState("Anonimous");
  const [userLName, setUserLName] = useState(" ");
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const isLoggedIn = useSelector(selectUser);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState("");
  const [isEthiopianUser, setIsEthiopianUser] = useState(false);
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedin(true);
      const userLogged = JSON.parse(loggedUser);
      console.log('display user', userLogged);
      setUserId(userLogged.user.id);
      setUserFName(userLogged.user.fname);
      setUserLName(userLogged.user.lname);
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);
  
      const checkPaymentStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: roleUser.user.id }),
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
  
          const paymentData = await response.json();
          setPaymentStatus(paymentData.paymentStatus);
        } catch (error) {
          console.error("Failed to verify payment:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      checkPaymentStatus();
  
    
      if (paymentStatus !== "paid") {
  
        const timeoutId = setTimeout(() => {
          checkPaymentStatus(); 
        }, 60000); 

        return () => clearTimeout(timeoutId);
      }
    
    }
  }, []);
  
  if (paymentStatus === "not_paid") {
    // navigate("/member_payment");
    navigate("/wired_member_payment"); 
  }
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

        const parsedIndex = parseInt(imageIndex, 10);
        if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < urls.length) {
          setCurrentImageIndex(parsedIndex);
        } else {
          setCurrentImageIndex(0);
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
      nextIndex = 0;
    }
    handleImageClick(nextIndex);
  };

  const handlePrevImage = () => {
    let prevIndex = currentImageIndex - 1;
    if (prevIndex < 0) {
      prevIndex = imageUrls.length - 1;
    }
    handleImageClick(prevIndex);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section style={{ textAlign: 'center' }}>
      <Helmet>
        <title>{id} | 2016 Exit Exam Question</title>
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
        isLoggedIn={isLoggedin}
        currentImageIndex={currentImageIndex}
        totalImages={imageUrls.length}
      />
      
      <ImagePagination
        totalImages={imageUrls.length}
        currentIndex={currentImageIndex}
        onImageClick={handleImageClick}
        isLoggedIn={isLoggedin}
      />
      
      <SocialShare
        id={id}
        isLoggedIn={isLoggedin}
        currentImageIndex={currentImageIndex}
        currentImageUrl={imageUrls[currentImageIndex]}
      />
      <CommentsSection 
        context_type="2015ExitImage" 
        context_id={currentImageIndex}
        parent_id={id}
        isLoggedIn={isLoggedin}
        user_id={isLoggedin ? userId : '0'}
        fname={userFName}
        lname={userLName}
      />
      <GeneralKnowledge title={id} />
    </section>
  );
};

export default ImageGallery;
