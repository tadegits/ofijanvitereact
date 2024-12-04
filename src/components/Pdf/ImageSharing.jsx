import React from 'react';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { FaTelegram } from 'react-icons/fa';

const ImageSharing = ({ id, currentImageIndex, currentImageUrl }) => {
  const baseUrl = window.location.origin;
  const shareableUrl = `${baseUrl}/image-gallery/${id}?imageIndex=${currentImageIndex}`;
  return (
    <div style={{ marginTop: '16px' }}>
      <h3>Share this image</h3>
      <div>
        <FacebookShareButton url={shareableUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareableUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={currentImageUrl}>
          <FaTelegram size={32} />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ImageSharing;
