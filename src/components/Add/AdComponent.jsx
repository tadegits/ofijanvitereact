import React, { useEffect } from 'react';
import './AdComponent.scss';
import Wrapper from '../wrapper/Wrapper';
const AdComponent = () => {
  useEffect(() => {
    // Ensure the ad is loaded when this component mounts
    window.adsbygoogle && window.adsbygoogle.push({});
  }, []);

  return (
    <div className="ad-container">

   
    <ins class="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-8449765590756444"
     data-ad-slot="6959146314">

     </ins>
     <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      </div>
  );
};

export default AdComponent;
