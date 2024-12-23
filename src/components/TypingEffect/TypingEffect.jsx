import React, { useState, useEffect } from 'react';
import './typing.scss';
const TypingEffect = ({ htmlText, speed = 50 }) => {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const plainText = htmlText.replace(/<[^>]*>/g, ''); // Extract plain text without HTML tags

  useEffect(() => {
    if (index < plainText.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + plainText[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId); // Cleanup on unmount
    }
  }, [index, plainText, speed]);

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: htmlText.slice(0, index) }} />
      <span className="cursor">|</span> {/* Cursor animation */}
    </div>
  );
};

export default TypingEffect;
