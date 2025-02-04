import { useState } from "react";
import axios from "axios";
import styles from "./UpdatePaymentStatus.module.scss"; // Import SCSS file

const UpdatePaymentStatus = () => {
  const [userId, setUserId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("not_paid");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://server.ofijan.com/api/update-payment-status", {
        userId,
        paymentStatus
      });
      setMessage("Payment status updated successfully");
    } catch (error) {
      setMessage("Failed to update payment status");
    }
  };

  return (
    <div className={styles["update-payment-status"]}>
      <h2>Update Payment Status</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <label>Payment Status:</label>
        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="paid">Paid</option>
          <option value="not_paid">Not Paid</option>
        </select>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePaymentStatus;
