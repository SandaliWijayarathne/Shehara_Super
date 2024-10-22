import React from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';

const Selection = () => {
  return (
    <nav>
      <Link to="/category/Beverages">Beverages</Link>
      <Link to="/category/Fruits">Fruits</Link>
      <Link to="/category/Vegetables">Vegetables</Link>
      <Link to="/category/BabyProducts">BabyProducts</Link>
      <Link to="/category/FrozenFoods">Frozen Foods</Link>
      <Link to="/category/Bakery">Bakery</Link>
      <Link to="/category/Household">Household</Link>
      <Link to="/category/Snacks">Snacks & Confectionary</Link>
      <Link to="/category/Spices">Spices</Link>
      <Link to="/category/Canned">Canned Foods</Link>
    </nav>
  );
};

export default Selection;
