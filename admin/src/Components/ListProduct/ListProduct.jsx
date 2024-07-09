import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import axios from 'axios';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editedPrices, setEditedPrices] = useState({});

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allproducts');
      console.log('Fetched products:', response.data);
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Remove a product
  const removeProduct = async (id) => {
    try {
      await axios.post('http://localhost:4000/removeproduct', { id });
      console.log(`Removed product with ID: ${id}`);
      fetchAllProducts(); // Refresh the list after removal
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  // Update product price
  const updateProductPrices = async (id, newPrice) => {
    try {
      const response = await axios.put(`http://localhost:4000/updateprice/${id}`, {
        price: newPrice
      });
      console.log('Update response:', response.data);
      fetchAllProducts(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  // Handle price input change
  const handlePriceChange = (id, value) => {
    setEditedPrices({
      ...editedPrices,
      [id]: value
    });
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Update Price</p>
        <p>Category</p>
        <p>Remove</p>
        <p>Update</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <div>Rs.{product.price}</div>
              <input
                type="number"
                defaultValue={product.price}
                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                className="listproduct-input"
              />
              <p>{product.category}</p>
              <img onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
              <button onClick={() => updateProductPrices(product.id, editedPrices[product.id])} className="listproduct-update-button">Update</button>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;
