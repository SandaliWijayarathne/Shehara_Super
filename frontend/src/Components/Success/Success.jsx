import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(''); 

  // Function to generate a random 6-digit OTP
  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otpCode);
  };

  useEffect(() => {
    generateOtp(); // Generate OTP when the component mounts

    // Simulate purchased items
    const purchasedItems = [
      { id: "product1", quantity: 2 },
      { id: "product2", quantity: 1 },
    ];

    // Call the backend to update stock after a successful purchase
    fetch("http://localhost:4000/update-stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: purchasedItems }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update stock");
      }
      return response.json();
    })
    .then(data => console.log("Stock updated:", data))
    .catch(error => console.error("Error updating stock:", error));
  }, []);

  const handleContinueShopping = () => {
    // Navigate to the home page or all products page
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
