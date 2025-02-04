import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payConfirmation.scss';
import Pay from '../logedin/payment/Pay';
import useLoggedInUser from './useLoggedInUser';
import API_BASE_URL from './apiConfig';

const PayConfirmation = () => {
  const { userId } = useLoggedInUser();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      setError('No user data found. Please log in again.');
      navigate('/login');
      return;
    }

    const roleUser = JSON.parse(loggedInUser);
    setUser(roleUser);

    const checkPaymentStatus = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: roleUser.user.id }),
        });

        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const paymentData = await response.json();

        if (!paymentData || paymentData.paymentStatus == null) {
          throw new Error("Invalid payment data received.");
        }

        setPaymentStatus(paymentData.paymentStatus);
      } catch (err) {
        console.error('Payment verification failed:', err.message);
        setError('Failed to verify payment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [navigate]);

  useEffect(() => {
    if (paymentStatus === 'paid') {
      navigate('/');
    }
  }, [paymentStatus, navigate]);

  const handleRetry = () => window.location.reload();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleRetry} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <header className="payment-header">
          <h2>Membership Checkout</h2>
          <p>Register as a member to continue browsing Ofijan and access exclusive benefits.</p>
        </header>

        <main className="payment-details">
          <div className="membership-fee">
            <h4>Membership Fee</h4>
            <p>100 ETB</p>
          </div>

          <div className="payment-method">
            <Pay
              fname={user?.user?.fname || 'User'}
              lname={user?.user?.lname || 'User'}
              examId={user?.user?.id || '1'}
              amount="100"
              email={user?.user?.email || 'simemillio@gmail.com'}
            />
            <hr />
            <a className="manual-payment-link" href="/wired_member_payment" target="_blank" rel="noopener noreferrer">
              Alternatively, use the Manual Payment Transfer option.
            </a>
          </div>
        </main>

        <footer className="payment-footer">
          <p>
            Need help? Contact our{' '}
            <a href="https://t.me/ofijanhelp" target="_blank" rel="noopener noreferrer">
              Telegram Help Center
            </a>.
          </p>
          <p>OFIJAN EXAMS</p>
        </footer>
      </div>
    </div>
  );
};

export default PayConfirmation;
