import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from 'axios';

const URL = "16.171.25.23"

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editedPrices, setEditedPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`http://${URL}:4000/allproducts`);
      setAllProducts(data);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const showConfirm = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      centered: true,
      style: { top: 20 },
      bodyStyle: { textAlign: 'center' },
      okButtonProps: { className: 'modal-ok-button' },
      cancelButtonProps: { className: 'modal-cancel-button' },
      onOk: () => removeProduct(id),
      onCancel: () => setDeletingProductId(null),
    });
    setDeletingProductId(id);
  };

  const removeProduct = async (id) => {
    try {
      await axios.post(`http://${URL}:4000/removeproduct`, { id });
      fetchAllProducts();
    } catch (error) {
      setError('Error removing product');
    }
  };

  const updateProductPrices = async (id, newPrice) => {
    try {
      await axios.put(`http://${URL}:4000/updateprice/${id}`, { price: newPrice });
      fetchAllProducts();
    } catch (error) {
      setError('Error updating price');
    }
  };

  const handlePriceChange = (id, value) => {
    setEditedPrices({
      ...editedPrices,
      [id]: value
    });
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      {error && <p className="error">{error}</p>}
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
        {loading ? <p>Loading...</p> : (
          <>
            {allProducts.map((product) => (
              <div className="listproduct-format" key={product.id}>
                <img src={product.image} alt={product.name} className="listproduct-product-icon" />
                <p>{product.name}</p>
                <div>Rs.{product.price}</div>
                <input
                  type="number"
                  value={editedPrices[product.id] || product.price}
                  onChange={(e) => handlePriceChange(product.id, e.target.value)}
                  className="listproduct-input"
                />
                <p>{product.category}</p>
                <DeleteOutlined
                  onClick={() => showConfirm(product.id)}
                  className="listproduct-remove-icon"
                  aria-label="Remove product"
                />
                <button
                  onClick={() => updateProductPrices(product.id, editedPrices[product.id] || product.price)}
                  className="listproduct-update-button"
                >
                  Update
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
