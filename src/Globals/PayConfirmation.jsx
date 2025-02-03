import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payConfirmation.scss';
import Pay from '../logedin/payment/Pay';
import useLoggedInUser from './useLoggedInUser';
import API_BASE_URL from './apiConfig';
import ManualPayment from './ManualPayment';

const PayConfirmation = () => {
  const { userId } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [payError, setPayError] = useState('');
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);

      const checkPaymentStatus = async () => {
        try {
          setIsLoading(true);
          setError(''); 

          const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: roleUser.user.id }), 
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const paymentData = await response.json();
          console.log("API Response:", paymentData);

          if (!paymentData || paymentData.paymentStatus == null) {
            throw new Error("Invalid payment data received from the server.");
          }

          setPaymentStatus(paymentData.paymentStatus);
          console.log("Setting paymentStatus to:", paymentData.paymentStatus);

        } catch (error) {
          console.error('Failed to verify payment:', error.message);
          setError('Failed to verify payment. Please try again later.');
        } finally {
          setIsLoading(false);
          setLoading2(false);
        }
      };

      checkPaymentStatus();
    } else {
      setLoading2(false);
      setError('No user data found. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);
if(paymentStatus === 'paid'){
  navigate('/');
}

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading2) {
    return <div className=".loading_container">
      <div className="loading">Loading...</div>
    </div>;
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
          <p>
            Welcome! Register as a member to continue browsing Ofijan and access exclusive benefits.
          </p>
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
            <p></p><p></p><p></p>
            <a className='bale_tla_card' href="/wired_member_payment" target="_blank" rel="noopener noreferrer">
              Alternatively, please use the Manual Payment Transfer option.
            </a>.

          </div>

        </main>
        <footer className="payment-footer">
          <p>
            Have questions? Contact our help center or write your feedback on{' '}
            <a href="https://t.me/ofijanhelp" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>.
          </p>
          <p>OFIJAN EXAMS</p>
        </footer>
      </div>
    </div>
  );
};

export default PayConfirmation;
