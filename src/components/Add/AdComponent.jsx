import React, { useEffect } from 'react';
import './AdvertismentCard.scss';

const AdComponent = () => {
  useEffect(() => {
    // Dynamically add the Google Ads script
    const adsScript = document.createElement('script');
    adsScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8449765590756444";
    adsScript.async = true;
    adsScript.crossOrigin = "anonymous";
    document.body.appendChild(adsScript);

    // Initialize ads after the script is loaded
    adsScript.onload = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error('Adsbygoogle initialization failed', e);
      }
    };

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(adsScript);
    };
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="+17+rm+14-55+8z"
        data-ad-client="ca-pub-8449765590756444"
        data-ad-slot="5009334468"
      ></ins>
    </div>
  );
};

export default AdComponent;
