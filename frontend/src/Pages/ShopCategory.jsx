<<<<<<< Updated upstream
import React, { useContext, useState } from 'react';
=======
import React, { useContext, useState, useEffect } from 'react';
>>>>>>> Stashed changes
import { useParams } from 'react-router-dom';
import './CSS/ProductCategory.css'; 
import { ShopContext } from '../Context/ShopContext';
import ProductItem from '../Components/ProductItem/ProductItem';
import UpImage from '../Components/Assets/BG.png';

const ShopCategory = () => {
  const { category } = useParams();
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

  const filteredProducts = all_product.filter(product => product.category === category);

  // Function to sort products based on the current sort criteria
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortBy === 'price') {
<<<<<<< Updated upstream
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
=======
        const priceA = parseFloat(a.Price); // Note the capital 'P' to match ProductDisplay
        const priceB = parseFloat(b.Price); // Note the capital 'P' to match ProductDisplay
        console.log(`Comparing prices: ${priceA} and ${priceB}`); // Debugging line
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
>>>>>>> Stashed changes
      }
      return 0;
    });
  };

  // Handle sorting change
<<<<<<< Updated upstream
  const handleSortChange = (sortBy) => {
    if (sortBy === sortBy) {
=======
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
>>>>>>> Stashed changes
      // Toggle sortOrder if sorting by the same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sortBy criteria
<<<<<<< Updated upstream
      setSortBy(sortBy);
=======
      setSortBy(newSortBy);
>>>>>>> Stashed changes
      setSortOrder('asc'); // Default to ascending order when changing sortBy criteria
    }
  };

<<<<<<< Updated upstream
=======
  useEffect(() => {
    console.log('Filtered Products:', filteredProducts);
    console.log('Sorted Products:', sortProducts(filteredProducts));
  }, [sortBy, sortOrder, filteredProducts]);

>>>>>>> Stashed changes
  return (
    <div className='shop-category'>
      <div className="up-image">
        <img src={UpImage} alt="" />
      </div>
      <h1>{category}</h1>

      {/* Sorting UI */}
<<<<<<< Updated upstream
      <div className="shopcategory-sort"> {/* Add this class to align buttons to the right */}
        <button onClick={() => handleSortChange('name')}>
          Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSortChange('price')}>
          Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
=======
      <div className="shopcategory-indexSort">
        <div className="shopcategory-sort">
          <button 
            onClick={() => handleSortChange('name')} 
            className={sortBy === 'name' ? 'active' : ''}
          >
            Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
          <button 
            onClick={() => handleSortChange('price')} 
            className={sortBy === 'price' ? 'active' : ''}
          >
            Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
        </div>
>>>>>>> Stashed changes
      </div>

      {/* Display sorted products */}
      <div className="shopcategory-products">
        {sortProducts(filteredProducts).map((product, i) => (
          <ProductItem key={i} product={product} />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
