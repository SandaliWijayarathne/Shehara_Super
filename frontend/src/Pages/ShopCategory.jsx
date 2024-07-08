import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/ProductCategory.css'; 
import { ShopContext } from '../Context/ShopContext';
import ProductItem from '../Components/ProductItem/ProductItem';
import UpImage from '../Components/Assets/BG.png';

const ShopCategory = () => {
  const { category } = useParams();
  const { all_product } = useContext(ShopContext);

  const filteredProducts = all_product.filter(product => product.category === category);

  return (
    <div className='product-category'>
      <div className="up-image">
      <img src={UpImage} alt="" />
      </div>
      <h1>{category}</h1>
      <div className="shopcategory-indexSort">
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((product, i) => (
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
