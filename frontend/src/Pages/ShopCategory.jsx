import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/ProductCategory.css'; 
import { ShopContext } from '../Context/ShopContext';
import ProductItem from '../Components/ProductItem/ProductItem';
import UpImage from '../Components/Assets/BG.png';
import Sort from '../Components/Sort/Sort';
import Breadcrum from '../Components/Breadcrum/Breadcrum';  // Import the Breadcrum component

const ShopCategory = () => {
  const { category } = useParams();
  const { all_product } = useContext(ShopContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = all_product.filter(product => product.category === category);
    setSortedProducts(filteredProducts);
  }, [all_product, category]);

  const handleSortProducts = (sortedProducts) => {
    setSortedProducts(sortedProducts);
  };

  return (
    <div className='product-category'>
      <div className="up-image">
        <img src={UpImage} alt="" />
      </div>

      {/* Replace the category title with the Breadcrum component */}
      <Breadcrum product={{ category, name: '' }} />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{sortedProducts.length}</span> out of {sortedProducts.length} products
        </p>
        <div className="shopcategory-sort">
          <Sort products={sortedProducts} setSortedProducts={handleSortProducts} />
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((product, i) => (
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
