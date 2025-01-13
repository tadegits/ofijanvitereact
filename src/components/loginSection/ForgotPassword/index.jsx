import React, { useState } from 'react';
import Wrapper from '../../wrapper/Wrapper';
import './forgotPassword.scss';

const Index = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for password reset
    if (email) {
      setMessage(`✅ Password reset link has been sent to ${email}`);
    } else {
      setMessage('❌ Please enter a valid email address.');
    }
  };

  return (
    <Wrapper>
      <div className="forgot-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit} className="forgot-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </Wrapper>
  );
};

export default Index;
