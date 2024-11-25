import React from 'react'

const AdSenseComponent = ({ adSlot, adStyle }) => {
    useEffect(() => {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    }, []);
  
    return (
      <div style={adStyle}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8449765590756444" 
          data-ad-slot={adSlot}  
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  };

export default AdSenseComponent
