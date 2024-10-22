import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Success.css';

const Success = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [otp, setOtp] = useState(''); // State to store the OTP

  // Function to generate a random 6-digit OTP
  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otpCode);
  };

  useEffect(() => {
    generateOtp(); // Generate OTP when the component mounts
  }, []);

  const handleContinueShopping = () => {
    // Navigate to the /allproducts endpoint
    navigate('/');
  };

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">
        Thank you for your purchase! Your payment has been processed successfully.
      </p>
      <div className="success-icon">&#10004;</div> {/* Check mark icon */}
      <p className="success-instructions">
        You will receive a confirmation email shortly. If you have any questions, feel free to reach out to our support team.
      </p>
      <p className="otp-code">Your OTP Code: <strong>{otp}</strong></p> {/* Display the OTP */}
      <button 
        className="continue-shopping-button" 
        onClick={handleContinueShopping} // Attach the click event
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
