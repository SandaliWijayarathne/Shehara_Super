import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const formattedPrice = product.price ? `Rs.${product.price.toFixed(2)}` : 'Price not available';

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
    </div>
  );
};

export default ProductItem;
