import React from 'react';
import { Image } from 'antd';

const ImageViewer = ({ imageUrl, altText }) => {
  return (
    <div style={{ margin: '16px 0' }}>
      <Image
        src={imageUrl}
        alt={altText}
        style={{ maxWidth: '100%', maxHeight: '300px' }}
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default ImageViewer;
