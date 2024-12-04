import React from 'react';
import { Image } from 'antd';

const ImageDisplay = ({ currentImageUrl, altText }) => (
  <div className="image-container" style={{ textAlign: 'center', marginTop: '16px' }}>
    <Image
      src={currentImageUrl}
      alt={altText}
      style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
      loading="lazy"
      className="imageee"
      onContextMenu={(e) => e.preventDefault()} // Disable right-click to protect the image
      preview={false} // Ant Design's default preview disabled for simplicity
    />
    <p style={{ marginTop: '8px', color: '#888' }}>{altText}</p>
  </div>
);

export default ImageDisplay;
