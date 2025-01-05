import React from 'react';
import { Image } from 'antd';

const ImageViewer = ({ imageUrl, altText, telegramLink }) => {
  // Handler for redirecting to Telegram
  const handleJoinTelegram = () => {
    window.location.href = telegramLink; 
  };

  return (
    <div
      style={{
        margin: '16px 0',
        touchAction: 'none',
        overflow: 'hidden',
      }}
    >
      <Image
        src={imageUrl}
        alt={altText}
        style={{
          maxWidth: '100%',
          maxHeight: '300px',
          objectFit: 'contain',
        }}
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
        preview={false}
      />
      <button 
        onClick={handleJoinTelegram} 
        style={{
          marginTop: '16px',
          padding: '10px 20px',
          backgroundColor: '#0088cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Join Telegram
      </button>
    </div>
  );
};

export default ImageViewer;
