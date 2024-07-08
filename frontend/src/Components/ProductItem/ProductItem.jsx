import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>Rs.{product.Price.toFixed(2)}</p>
    </div>
  );
};

export default ProductItem;
