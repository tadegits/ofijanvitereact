import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payConfirmation.scss';
import Pay from '../logedin/payment/Pay';
import useLoggedInUser from './useLoggedInUser';
import API_BASE_URL from './apiConfig';
const ManualPayment = () => {
  const { userId } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
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

  const handlePostClick = async () => {
    if (!selectedUsername) {
      toast.error("Please select a Telegram username.");
      return;
    }
    console.log(product, 'product')
    setLoading(true);
    try {
      const specialText = `Order Now 👉🏽 https://t.me/dantelpm_bot/Dantel_PM?startapp=itemserial-${product.id}`;
      const caption = encodeURIComponent(
        `${product.productName}\n${specialText}\nPrice: ${product.price}\nCategory: ${product.category}`
      );
      const photoUrl = encodeURIComponent(product.productPicture);
      const url = `https://api.telegram.org/bot7400786506:AAGMACSYfm047YyBK3ci2IYOGy5VIPs7j9s/sendPhoto?chat_id=${selectedUsername}&photo=${photoUrl}&caption=${caption}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to post to Telegram");
      }
      toast.success("Product posted to Telegram!");
    } catch (error) {
      console.error("Error posting to Telegram:", error);
      toast.error("Failed to post to Telegram.");
    } finally {
      setLoading(false);
      onClose();
    }
  };
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

            <ul>
              <li>
                Trasfer 100 Birr to 1000243061001 Commercial Bank Of Ethiopia
              </li>
              <li>
                Trasfer 100 Birr  Tele Birr to 0905405875
              </li>
              <li>
                USe the followig paymet optios
              </li>
            </ul>
            <p>Up on Completion upload the screen Shoot or Send it to @OfijanExamPreparation Telegram </p>
            <button
              className={`primary-button ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handlePostClick}
              disabled={loadingUpload}
            >
              {loadingUpload ? "Posting..." : "Upload Screen Shot"}
            </button>

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

export default ManualPayment;
