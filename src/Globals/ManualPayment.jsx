import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './payConfirmation.scss';
import useLoggedInUser from './useLoggedInUser';
import API_BASE_URL from './apiConfig';

const ManualPayment = () => {
  const { userId } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);
      checkPaymentStatus(roleUser.user.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const checkPaymentStatus = async (userId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to verify payment');
      const paymentData = await response.json();
      setPaymentStatus(paymentData.paymentStatus);

      if (paymentData.paymentStatus === 'paid') {
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to verify payment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (waiting) {
      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const paymentCheckTimer = setInterval(() => {
        checkPaymentStatus(user?.user.id);
      }, 60000); // Check every minute

      return () => {
        clearInterval(countdownTimer);
        clearInterval(paymentCheckTimer);
      };
    }
  }, [waiting]);

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedScreenshot(file);
    }
  };

  const handlePostClick = async () => {
    if (!uploadedScreenshot) {
      toast.error('Please upload a screenshot first.');
      return;
    }
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append('photo', uploadedScreenshot);
      formData.append('chat_id', '@ephronplus');
      formData.append(
        'caption',
        `New payment submission by user: ${user.user.id}\nPrice: 100 ETB\nCategory: ${user.user.phone}`
      );

      const telegramUrl = `https://api.telegram.org/bot7400786506:AAGMACSYfm047YyBK3ci2IYOGy5VIPs7j9s/sendPhoto`;
      const telegramResponse = await fetch(telegramUrl, { method: 'POST', body: formData });
      if (!telegramResponse.ok) throw new Error('Failed to send screenshot to Telegram');

      toast.success('Your screenshot has been submitted successfully. Waiting for admin approval.');
      setWaiting(true);
    } catch (error) {
      toast.error('Failed to send screenshot.');
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <header className="payment-header">
          <h2>Membership Checkout</h2>
          <p>Become a member to continue using Ofijan Exam services.</p>
        </header>
        <main className="payment-details">
          <div className="membership-fee">
            <h4>Manual Payment</h4>
            <p>100 ETB</p>
          </div>

          <div className="payment-method">
            <ul>
              <li>Transfer 100 ETB to: 1000243061001 (Commercial Bank of Ethiopia)</li>
              <li>Transfer 100 ETB via Telebirr to: 0905405875</li>
              <li>Upload your payment confirmation below</li>
            </ul>

            <input className='bale_tla_card' type="file" accept="image/*" onChange={handleUploadChange} disabled={loadingUpload} />
            <br/><br/>
            <button className='bale_tla_card' onClick={handlePostClick} disabled={loadingUpload || waiting}>
              {loadingUpload ? 'Uploading...' : 'Upload Screenshot'}
            </button>
          </div>
        </main>

        {waiting && (
          <div className="waiting-section">
            <p>Hold until the admin approves your payment.</p>
            <progress value={600 - timeLeft} max={600}></progress>
            <p>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')} remaining</p>
          </div>
        )}

        <footer className="payment-footer">
          <p>
            Need help? Contact us on{' '}
            <a href="https://t.me/ofijanexams" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ManualPayment;
