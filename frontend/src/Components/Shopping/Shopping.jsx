import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Shopping.css'; 

const URL ="localhost";

const Shopping = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {

      const response = await fetch(`http://${URL}:4000/allproducts`);
      const data = await response.json();
      const updatedData = data.map((images) => {
        if (images.image) {
          images.image = `http://${URL}:4000${images.image}`;
        }
        return images;
      });
      console.log(data);
      console.log(updatedData);
      setProducts(updatedData);

    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  return (
    <div className="shopping">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p>Price: Rs.{product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Shopping;
