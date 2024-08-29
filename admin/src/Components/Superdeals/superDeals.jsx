import React from 'react';
import './SuperDeals.css';

const SuperDeals = () => {
  return (
    <div className='super-deals'>
      <h1>Super Deals</h1>
      <p>Discover our best deals and discounts on a variety of products. Don’t miss out on these exclusive offers!</p>
      <div className='deals-grid'>
        {/* Example of a deal item */}
        <div className='deal-item'>
          <h3>Deal Title</h3>
          <p>Up to 50% off on selected items!</p>
        </div>
        {/* Add more deal items here */}
      </div>
    </div>
  );
}

export default SuperDeals;
