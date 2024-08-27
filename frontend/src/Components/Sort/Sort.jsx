import React, { useState } from 'react';
import './Sort.css';

const Sort = ({ products, setSortedProducts }) => {
  const [sortCriteria, setSortCriteria] = useState('none');

  const handleSort = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);

    let sortedProducts = [...products];
    if (criteria === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'name-desc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedProducts);
  };

  return (
    <div className="sort-container">
     <p>Sort by :</p> 
      <select onChange={handleSort} value={sortCriteria}>
        <option value="none">None</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
