import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/search?q=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        let data = await response.json();
        
        // Sort products initially
        data = sortProducts(data, sortBy, sortOrder);
        
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, sortOrder]);

  const sortProducts = (products, sortBy, sortOrder) => {
    return products.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else if (sortBy === 'price') {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      }
      return 0;
    });
  };

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

  if (loading) {
    return <p>Loading...</p>; // Consider using a loading spinner or animation
  }

  if (error) {
    return <p>Error: {error}</p>; // Improve UX for error handling
  }

  return (
    <div className="category-page">
      <h1>{category}</h1>

      {/* Sorting UI */}
      <div className="sort-options">
        <button onClick={() => handleSortChange('name')}>
          Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSortChange('price')}>
          Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.name} className="product-image" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
