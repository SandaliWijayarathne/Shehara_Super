import React, { useState } from 'react';
import './CSS/Delivery.css';

const Delivery = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingDetails, setTrackingDetails] = useState(null);

  const handleTrack = () => {
    const mockTrackingDetails = {
      id: trackingId,
      status: 'In Transit',
      estimatedDelivery: '2024-06-20',
      currentLocation: 'Kurunegala, Sri Lanka'
    };
    setTrackingDetails(mockTrackingDetails);
  };

  return (
    <div className="delivery-container">
      <h1>Track Your Delivery</h1>
      <div className="tracking-form">
        <input
          type="text"
          placeholder="Enter your tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={handleTrack}>Track</button>
      </div>
      {trackingDetails && (
        <div className="tracking-details">
          <h2>Tracking Details</h2>
          <p><strong>Tracking ID:</strong> {trackingDetails.id}</p>
          <p><strong>Status:</strong> {trackingDetails.status}</p>
          <p><strong>Estimated Delivery:</strong> {trackingDetails.estimatedDelivery}</p>
          <p><strong>Current Location:</strong> {trackingDetails.currentLocation}</p>
        </div>
      )}
    </div>
  );
};

export default Delivery;
