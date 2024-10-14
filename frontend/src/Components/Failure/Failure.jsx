import React from 'react';
import './Failure.css'; 

const Failure = () => {
  return (
    <div className="failure-container">
      <h1 className="failure-title">Payment Failed</h1>
      <p className="failure-message">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div className="failure-icon">&#10060;</div> {/* Cross mark icon */}
      <p className="failure-instructions">
        If you continue to experience issues, please contact our support team for assistance.
      </p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Retry Payment
      </button>
      <button className="continue-shopping-button" onClick={() => window.location.href='/allproducts'}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Failure;
