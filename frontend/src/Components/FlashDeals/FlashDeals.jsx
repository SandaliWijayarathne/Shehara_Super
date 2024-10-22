import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashDeals.css';

const URL ="localhost"

const FlashDeals = () => {
  const [flashDeals, setFlashDeals] = useState([]);
  const navigate = useNavigate();

  // Fetch all products with discounts
  const fetchFlashDeals = async () => {
    try {
      const response = await fetch(`http://${URL}:4000/allproducts`);
      if (!response.ok) {
        throw new Error('Failed to fetch flash deals');
      }
      const data = await response.json();
      const updatedData = data.map((images) => {
            if (images.image) {
              images.image = `http://${URL}:4000${images.image}`;
            }
            return images;
          });
          console.log(data);
          console.log(updatedData);
          const productsWithDiscount = updatedData.filter(product => product.discount > 0);
      setFlashDeals(productsWithDiscount);
    } catch (error) {
      console.error('Error fetching flash deals:', error);
    }
  };

  // Function to handle navigation to product detail page
  const handleNavigateToProduct = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (event, itemId) => {
    event.stopPropagation(); // Prevent card click event from firing
    // Add your add-to-cart logic here
    console.log(`Add product ${itemId} to cart`);
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
            <div 
              className="flash-deal-card" 
              key={product.id}
              onClick={() => handleNavigateToProduct(product.id)} // Handle click on the entire card
            >
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
                onClick={() => handleNavigateToProduct(product.id)} 
              >
                View Product
              </button>
            </div>
          ))
        ) : (
          <p className="no-flash-deals-message">Sorry, currently no flash deals are available.</p>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
