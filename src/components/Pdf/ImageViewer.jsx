import React from 'react';
import { Image } from 'antd';

const ImageViewer = ({ imageUrl, altText }) => {
  return (
    <div
      style={{
        margin: '16px 0',
        touchAction: 'none', // Prevents touch gestures like pinch-to-zoom
        overflow: 'hidden', // Ensures the image doesn't overflow the container
      }}
    >
      <Image
        src={imageUrl}
        alt={altText}
        style={{
          maxWidth: '100%',
          maxHeight: '300px',
          objectFit: 'contain', // Keeps the image aspect ratio intact
        }}
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()} // Disables right-click menu
        preview={false} // Disables the zooming preview feature of Ant Design Image
      />
    </div>
  );
};

export default ImageViewer;
