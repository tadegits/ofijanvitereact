import React, { useState, useEffect } from 'react';
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram, FaTelegram } from 'react-icons/fa';
import "./FixedBottomComponent.scss"

const FixedBottomComponent = () => {
  const [adSlots] = useState([
    'ca-pub-8449765590756444/5010980682',
    'ca-pub-8449765590756444/5008665583',
    'ca-pub-8449765590756444/5224288002',
  ]);
  const [currentAdSlot, setCurrentAdSlot] = useState(adSlots[0]);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  useEffect(() => {
    const adsbygoogleScript = document.createElement('script');
    adsbygoogleScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adsbygoogleScript.async = true;
    adsbygoogleScript.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        setShowSocialLinks(true);
      }
    };
    document.body.appendChild(adsbygoogleScript);

    return () => {
      document.body.removeChild(adsbygoogleScript);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAdSlot((prevSlot) => {
        const nextIndex = (adSlots.indexOf(prevSlot) + 1) % adSlots.length;
        return adSlots[nextIndex];
      });
    }, 6000);

    return () => clearInterval(intervalId);
  }, [adSlots]);

  return (
    <div className="fixed-bottom-component">
      {showSocialLinks ? (
        <div className="social-container">
          <p>Join us on:</p>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61567914607586" target="_blank" rel="noopener noreferrer" className="facebook">
              <FaFacebook className='facebook'/>
            </a>
            <a href="https://t.me/OfijanExams" target="_blank" rel="noopener noreferrer" className="twitter">
              <FaTelegram className='facebook' />
            </a>
            <a href="https://linkedin.com/company/ofijan-exams" target="_blank" rel="noopener noreferrer" className="linkedin">
              <FaLinkedin className='facebook' />
            </a>
            <a href="https://www.youtube.com/@OfijanExams" target="_blank" rel="noopener noreferrer" className="instagram">
              <FaYoutube className='facebook' />
            </a>
          </div>
        </div>
      ) : (
        <div className="ads-container">
          <ins
            className="adsbygoogle"
            data-ad-client="ca-pub-8449765590756444"
            data-ad-slot={currentAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
    </div>
  );
  
};

export default FixedBottomComponent;
