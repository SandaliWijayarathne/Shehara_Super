import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../Assets/logo.png';
import { ShopContext } from '../../Context/ShopContext'; // Import ShopContext

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useContext(ShopContext); // Get cart count from context

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shopping?search=${searchQuery}`);
    } else {
      navigate('/'); // Navigate to the home page when search query is cleared
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      navigate('/'); // Navigate to the home page if the input is cleared
      window.location.reload(); // Refresh the page
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <button className="menu-toggle">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <ul className={`nav-menu`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shopping">Shop</Link></li>
            <li><Link to="/location">Location</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li>
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                  ? <button className="login-button" onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
                  : <Link to='/login'><button className="login-button">Login</button></Link>}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch}>
          <span role="img" aria-label="search">SEARCH PRODUCTS 🔍</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
