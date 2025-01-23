import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payConfirmation.scss';
import Pay from '../logedin/payment/Pay';
import useLoggedInUser from './useLoggedInUser';
import API_BASE_URL from './apiConfig';
const PayConfirmation = () => {
  const { userId } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);

      const checkPaymentStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: roleUser.user.id }),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
    
          const paymentData = await response.json();
          setPaymentStatus(paymentData.paymentStatus); 
          console.log("response", paymentData);
        } catch (error) {
          console.error("Failed to verify payment:", error.message);
        
        } finally {
          setLoading(false);
        }
      };
    
      checkPaymentStatus();
    }
    }, []);

console.log('status', paymentStatus);

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
              fname="Million"
              lname="Sime"
              examId="1"
              amount="100"
              email="simemillion@gmail.com"
            />
          </div>
          
        </main>
        <footer className="payment-footer">
          <p>
            Have questions? Contact our help center or write your feedback on{' '}
            <a href="https://t.me/ofijanexams">Telegram</a>.
            <p>OFIJAN EXAMS</p>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PayConfirmation;
