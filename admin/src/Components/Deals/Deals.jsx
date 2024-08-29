import React from 'react';
import './Deals.css';

const Deals = () => {
  return (
    <div className='deals'>
      <h1>Special Deals</h1>
      <p>Check out our special deals on a wide range of products. Grab them before they’re gone!</p>
      <div className='deals-list'>
        {/* Example of a deal item */}
        <div className='deal'>
          <h2>Deal Title</h2>
          <p>Special discount on various products.</p>
          <button className='btn-view-details'>View Details</button>
        </div>
        {/* Add more deals here */}
      </div>
    </div>
  );
}

export default Deals;
