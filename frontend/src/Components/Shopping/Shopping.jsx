import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Shopping.css'; // Make sure to import the CSS file

const Shopping = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setProducts(data);
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
            {/* Link to the Product page with the product's ID */}
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Shopping;