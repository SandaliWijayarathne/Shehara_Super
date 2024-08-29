import React from 'react';
import './FlashDeals.css';
import image1 from "../Assets/FF1.png";
import image2 from "../Assets/P_6.png";

const FlashDeals = () => {
  return (
    <div className="maincontainer">
      <p className="text">Super Deals</p>
      <div className="flash-deals-container">
        <div className="flash-deal-card">
          <div className="discount-label">25% OFF</div>
          <img 
            src={image1}
            alt="Product 1"
            className="flash-deal-image"
          />
          <p className="flash-deal-title">Product Title 1</p>
          <p className="flash-deal-price">
            <span className="flash-deal-old-price">Rs 425.00</span> Rs 318.00 / Unit
          </p>
          <button className="flash-deal-button">Add to Cart</button>
        </div>

        <div className="flash-deal-card">
          <div className="discount-label">25% OFF</div>
          <img
            src={image2}
            alt="Product 2"
            className="flash-deal-image"
          />
          <p className="flash-deal-title">Product Title 2</p>
          <p className="flash-deal-price">
            <span className="flash-deal-old-price">Rs 425.00</span> Rs 318.00 / Unit
          </p>
          <button className="flash-deal-button">Add to Cart</button>
        </div>

        <div className="flash-deal-card">
          <div className="discount-label">25% OFF</div>
          <img
            src={image2}
            alt="Product 3"
            className="flash-deal-image"
          />
          <p className="flash-deal-title">Product Title 3</p>
          <p className="flash-deal-price">
            <span className="flash-deal-old-price">Rs 425.00</span> Rs 318.00 / Unit
          </p>
          <button className="flash-deal-button">Add to Cart</button>
        </div>

        <div className="flash-deal-card">
          <div className="discount-label">25% OFF</div>
          <img
            src={image1}
            alt="Product 4"
            className="flash-deal-image"
          />
          <p className="flash-deal-title">Product Title 4</p>
          <p className="flash-deal-price">
            <span className="flash-deal-old-price">Rs 425.00</span> Rs 318.00 / Unit
          </p>
          <button className="flash-deal-button">Add to Cart</button>
        </div>

        <div className="flash-deal-card">
          <div className="discount-label">25% OFF</div>
          <img
            src={image1}
            alt="Product 5"
            className="flash-deal-image"
          />
          <p className="flash-deal-title">Product Title 5</p>
          <p className="flash-deal-price">
            <span className="flash-deal-old-price">Rs 425.00</span> Rs 318.00 / Unit
          </p>
          <button className="flash-deal-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;
