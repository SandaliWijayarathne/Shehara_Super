import React, { useContext, useState } from 'react';
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
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  };

  // Handle sorting change
  const handleSortChange = (sortBy) => {
    if (sortBy === sortBy) {
      // Toggle sortOrder if sorting by the same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sortBy criteria
      setSortBy(sortBy);
      setSortOrder('asc'); // Default to ascending order when changing sortBy criteria
    }
  };

  return (
    <div className='product-category'>
      <div className="up-image">
        <img src={UpImage} alt="" />
      </div>
      <h1>{category}</h1>

      {/* Sorting UI */}
      <div className="shopcategory-sort"> {/* Add this class to align buttons to the right */}
        <button onClick={() => handleSortChange('name')}>
          Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSortChange('price')}>
          Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
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
