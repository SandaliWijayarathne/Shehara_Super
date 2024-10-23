import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { message } from 'antd'; // Import message from antd


URL = "13.51.121.50"
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Vegetables",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.price || !image) {
      setError('Please fill in all fields and upload an image.');
      message.error('Please fill in all fields and upload an image.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('product', image);
  
      const imageResponse = await fetch(`http://${S_URL}:4000/uploadproductimage`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }).then((resp) => resp.json());
  
      if (imageResponse.success) {
        productDetails.image = imageResponse.image_url;
        const productResponse = await fetch(`http://${S_URL}:4000/addproduct`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productDetails),
        }).then((resp) => resp.json());
  
        if (productResponse.success) {
          message.success("Product Added Successfully!");
          setProductDetails({
            name: "",
            image: "",
            category: "Vegetables",
            price: ""
          });
          setImage(null);
        } else {
          setError("Failed to add product");
          message.error("Failed to add product");
        }
      } else {
        setError("Failed to upload image");
        message.error("Failed to upload image");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add-product'>
      {error && <p className="error">{error}</p>}
      <h1 className='add-product-title'>Add New Product</h1>
      <div className="form-group">
        <label>Product Title</label>
        <input 
          value={productDetails.name} 
          onChange={changeHandler} 
          type="text" 
          name='name' 
          placeholder='Enter product title' 
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input 
          value={productDetails.price} 
          onChange={changeHandler} 
          type="text" 
          name='price' 
          placeholder='Enter price' 
        />
      </div>
      <div className="form-group">
        <label>Product Category</label>
        <select 
          value={productDetails.category} 
          onChange={changeHandler} 
          name='category' 
          className='product-category-selector'
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Bakery">Bakery</option>
          <option value="Spices">Spices</option>
          <option value="Household">Household</option>
          <option value="BabyProducts">Baby Products</option>
          <option value="Canned">Canned Products</option>
          <option value="Snacks">Snacks and Confectionary</option>
          <option value="Beverages">Beverages</option>
          <option value="FrozenFoods">Frozen Food</option>
          <option value="Fruits">Fruits</option>
        </select>
      </div>
      <div className="form-group image-upload">
        <label htmlFor="file-input" className='upload-label'>
          <img src={image ? URL.createObjectURL(image) : upload_area} className='thumbnail-img' alt="Upload Area" />
          <p>Upload Product Image</p>
        </label>
        <input 
          onChange={imageHandler} 
          type="file" 
          name='image' 
          id='file-input' 
          hidden 
        />
      </div>
      <button onClick={Add_Product} className='add-product-btn' disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </div>
  );
}

export default AddProduct;
