// OcrComponent.jsx
import React, { useState } from 'react';
import { Button, Spin, Typography } from 'antd';
import Tesseract from 'tesseract.js';

const { Text } = Typography;

const OcrComponent = ({ imageUrl }) => {
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState('');

  const handleOcr = () => {
    setLoading(true);
    setOcrResult('');

    Tesseract.recognize(
      imageUrl, // Image URL
      'eng',    // Language code (English in this case)
      {
        logger: (info) => console.log(info), // Logs OCR progress
      }
    )
      .then(({ data: { text } }) => {
        setOcrResult(text);
      })
      .catch((err) => {
        console.error('OCR Error:', err);
        setOcrResult('Failed to extract text. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Button type="primary" onClick={handleOcr} disabled={loading}>
        Show Answer
      </Button>
      {loading && <Spin style={{ display: 'block', marginTop: '8px' }} />}
      {ocrResult && (
        <div style={{ marginTop: '16px', textAlign: 'left' }}>
          <h3>Extracted Text:</h3>
          <Text>{ocrResult}</Text>
        </div>
      )}
    </div>
  );
};

export default OcrComponent;
