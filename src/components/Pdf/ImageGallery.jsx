import React, { useState, useEffect } from 'react';
import { Button, Spin, Image } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import { selectUser, selectRedirectUrl, setRedirectUrl } from "../../features/userSlice";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ImageGallery = ({ id }) => {
  const [imageUrls, setImageUrls] = useState([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null); 
  const imagesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useSelector(selectUser);
const dispatch = useDispatch();
const navigate = useNavigate();
const redirectUrl = useSelector(selectRedirectUrl);
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
      if (!imageUrls.length) return; 

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

  const handleNextPage = () => {
if(!isLoggedIn)
{
  console.log('logedin', isLoggedIn)
handleSweetAlert();
}
else{
  setCurrentPage((prevPage) => prevPage + 1);
}
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleSweetAlert = () => {
    Swal.fire({
        text: 'Login to get the rest of the questions!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login Now',
    }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setRedirectUrl(window.location.pathname));
          window.location.href = '/Login';
          navigate('/Login');
        }
    });
};
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const imagesToDisplay = imageUrls.slice(startIndex, endIndex);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display error message
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <Button onClick={handlePrevPage} style={{ marginRight: '8px' }} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={endIndex >= imageUrls.length}>
          Next Page
        </Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        {imagesToDisplay.map((imageUrl, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Image src={imageUrl} alt="Image not found" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <Button onClick={handlePrevPage} style={{ marginRight: '8px' }} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={endIndex >= imageUrls.length}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default ImageGallery;
