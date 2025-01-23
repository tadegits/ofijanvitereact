import React from 'react';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { FaTelegram } from 'react-icons/fa';
import './ImageGallery.scss';

const ImageSharing = ({ id, currentImageIndex, currentImageUrl }) => {
  const baseUrl = window.location.origin;
  const shareableUrl = `${baseUrl}/image-gallery/${id}?imageIndex=${currentImageIndex}`;
  return (
    <div>
      <h6>download</h6>
      <div  className="share_social">
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
