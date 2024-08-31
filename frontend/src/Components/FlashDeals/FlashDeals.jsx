import React, { useEffect, useState } from 'react';
import './FlashDeals.css';

const FlashDeals = () => {
  const [flashDeals, setFlashDeals] = useState([]);

  // Fetch all products with discounts
  const fetchFlashDeals = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch flash deals');
      }
      const data = await response.json();
      const productsWithDiscount = data.filter(product => product.discount > 0);
      setFlashDeals(productsWithDiscount);
    } catch (error) {
      console.error('Error fetching flash deals:', error);
    }
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = async (itemId) => {
    try {
      const response = await fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      console.log(`Product ${itemId} added to cart`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  useEffect(() => {
    fetchFlashDeals();
  }, []);

  return (
    <div className="maincontainer">
      <p className="text">Super Deals</p>
      <div className="flash-deals-container">
        {flashDeals.length > 0 ? (
          flashDeals.map(product => (
            <div className="flash-deal-card" key={product.id}>
              <div className="discount-label">{product.discount}% OFF</div>
              <img 
                src={product.image}
                alt={product.name}
                className="flash-deal-image"
              />
              <p className="flash-deal-title">{product.name}</p>
              <p className="flash-deal-price">
                <span className="flash-deal-old-price">Rs {product.price}</span> 
                Rs {(product.price * (1 - product.discount / 100)).toFixed(2)} / Unit
              </p>
              <button 
                className="flash-deal-button"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No flash deals available</p>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
