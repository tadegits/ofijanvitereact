import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const Payment = ({ transactionId }) => {
const [verificationResult, setVerificationResult] = useState(null);
const { refrence, itemId } = useParams();
const navigate = useNavigate();
console.log(itemId)
const verifyPayment = () => {
    fetch(`http://127.0.0.1:8000/api/verify-payment/${refrence}`)
      .then(response => {
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          } else {
            throw new TypeError('Response is not JSON');
          }
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        setVerificationResult(data.status);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  useEffect(() => {
    verifyPayment();
  }, [transactionId]);

  useEffect(() => {
    if (verificationResult === "success") {
      navigate('/dashboard'); 
    } else if (verificationResult === "failure") {
      navigate('/ofijan_blogs'); 
    }
  }, [verificationResult]);

  return (
    <div>
      <p>Verifying payment...</p>
    </div>
  );
};
export default Payment;