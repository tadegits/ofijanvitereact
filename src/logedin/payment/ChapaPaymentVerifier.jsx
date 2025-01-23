import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../Globals/apiConfig";
import useLoggedInUser from "../../Globals/useLoggedInUser";

const ChapaPaymentVerifier = ({ onStatusUpdate }) => {
  const { id } = useParams();
  const { userId } = useLoggedInUser();
  const navigate = useNavigate();
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {

      if (!userId || !id) {
        setError("Invalid user or payment ID.");
        return;
      }

      setLoading(true);
      setError(null);
      setVerificationResult(null);

      try {
        const response = await fetch(`${API_BASE_URL}/verify/${id}`);
        if (!response.ok) {
          throw new Error(`Verification failed: ${response.statusText}`);
        }

        const data = await response.json();
        setVerificationResult(data.status);

        if (data.status === "success") {
          await updateUserStatus();
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [id, userId]);

  const updateUserStatus = useCallback(async () => {
    try {
      const updateResponse = await fetch(`${API_BASE_URL}/update-payment-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, paymentStatus: "paid" }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update payment status.");
      }

      if (onStatusUpdate) {
        onStatusUpdate(); // Notify parent component of status update
      }
    } catch (error) {
      setUpdateError(error.message);
    }
  }, [userId, onStatusUpdate]);

  return (
    <div className="verify" style={{ padding: "20px", textAlign: "center" }}>


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {verificationResult && (
        <h2>
          {verificationResult === "success"
            ? "Payment verified successfully 🎉   Now click the Logo to navigate"
            : "Payment verification failed 😞"}
        </h2>
      )}

      {updateError && (
        <p style={{ color: "red" }}>Failed to update user status: {updateError}</p>
      )}
    </div>
  );
};

export default ChapaPaymentVerifier;

