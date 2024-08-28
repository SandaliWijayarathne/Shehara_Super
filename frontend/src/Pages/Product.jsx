import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();  // Get the productId from the URL
  const product = all_product.find((e) => e.id === Number(productId));  // Find the product by ID

  if (!product) {
    return <div>Product not found</div>;  // Handle the case where the product is not found
  }

  return (
    <div>
      <Breadcrum product={product} />  // Display breadcrumb navigation
      <ProductDisplay product={product} />  // Display the product details
    </div>
  );
};

export default Product;
