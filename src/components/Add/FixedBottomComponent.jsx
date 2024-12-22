import React, { useState, useEffect } from 'react';


const FixedBottomComponent = () => {
  const [adSlots, setAdSlots] = useState([
    'ca-pub-8449765590756444/5010980682',
    // ... other ad slot IDs
  ]);
  const [currentAdSlot, setCurrentAdSlot] = useState(adSlots[0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (adSlots.indexOf(currentAdSlot) + 1) % adSlots.length;
      setCurrentAdSlot(adSlots[nextIndex]);
    }, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId);
  }, [adSlots, currentAdSlot]);

  const handleError = (error) => {
    setError(error.message || 'Failed to load ad'); // Set a more informative error message
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f0f0f0', padding: '10px' }}>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ins class="adsbygoogle"
        style={{ display: 'block' }}
     data-ad-client="ca-pub-8449765590756444"
     data-ad-slot={currentAdSlot}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
      )}
    </div>
  );
};

export default FixedBottomComponent;