// import React, { useState, useEffect } from 'react';
// import { Button, Spin, Image } from 'antd';
// import axios from 'axios';
// import API_BASE_URL from '../../Globals/apiConfig';

// const ImageGallery = () => {
//     const [imageUrls, setImageUrls] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [imageData, setImageData] = useState(null);

//     useEffect(() => {
//         const fetchImageUrls = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`${API_BASE_URL}/images/1`);
//                 setImageUrls(response.data);
//             } catch (error) {
//                 console.error('Error fetching image URLs:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchImageUrls();
//     }, []);

//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/singleimage/1/${imageUrls[currentImageIndex]}`);
//                 setImageData(response.data);
//             } catch (error) {
//                 console.error('Error fetching image:', error);
//             }
//         };

//         fetchImage();
//     }, [currentImageIndex, imageUrls]);

//     const handleNextImage = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
//     };

//     const handlePrevImage = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
//     };

//     if (loading) {
//         return <Spin size="large" />;
//     }

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
//                 <Button onClick={handlePrevImage} style={{ marginRight: '8px' }}>
//                     Previous
//                 </Button>
//                 <Button onClick={handleNextImage}>Next</Button>
//             </div>
//             <div style={{ textAlign: 'center' }}>
               
//                     <img src={imageData} alt="millio" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                
//             </div>
//         </div>
//     );
// };

// export default ImageGallery;
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../Globals/apiConfig';
function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/images/1.PNG`);
        console.log('response', response);
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        const imagePaths = await response.json();
        setImages(imagePaths);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading images...</p>}
      {error && <p>Error: {error}</p>}
      {images.length > 0 && (
        <ul className="image-gallery">
          {images.map((imageUrl) => (
            <li key={imageUrl}>
              <img src={imageUrl} alt="Fetched Image" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ImageGallery;