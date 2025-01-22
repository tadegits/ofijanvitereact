import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
import Footer from "./components/footer/footer";
import FloatingCommentButton from "./Globals/FloatingCommentButton";
import ChapaPaymentVerifier from "./logedin/payment/ChapaPaymentVerifier";
import PayConfirmation from "./Globals/PayConfirmation";
import { selectUser } from "./features/userSlice";
import API_BASE_URL from "./Globals/apiConfig";

function App() {
  const [user, setUser] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdated, setStatusUpdated] = useState(false); // Track updates
  const isLoggedIn = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndPaymentStatus = async () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const roleUser = JSON.parse(loggedInUser);
        setUser(roleUser);

        try {
          const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: roleUser.user.id }),
          });

          if (!response.ok) {
            throw new Error("Failed to verify payment status.");
          }

          const data = await response.json();
          setPaymentStatus(data.paymentStatus || "unpaid");
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
      setLoading(false);
    };

    checkUserAndPaymentStatus();
  }, []);

  const handleStatusUpdate = useCallback(() => {
    setStatusUpdated(true);
    setPaymentStatus("paid");
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <Default />
        <FloatingCommentButton />
        <Footer />
      </>
    );
  }

  if (paymentStatus !== "paid" && !statusUpdated) {
    return <PayConfirmation />;
  }

  return (
    <>
      <Navbar />
      <Loged />
      <FloatingCommentButton />
      <Footer />
    </>
  );
}

export default App;
