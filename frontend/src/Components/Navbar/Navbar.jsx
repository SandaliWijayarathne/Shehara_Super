import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import logo from '../Assets/logo.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useContext(ShopContext);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shopping?search=${searchQuery}`);
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      navigate('/');
      window.location.reload();
    }
  };

  const isLoggedIn = !!localStorage.getItem('auth-token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace('/');
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
            {isLoggedIn && (
              <li>
                <Link to="/user-profile" className="profile-icon">
                  <FaUserCircle />
                </Link>
              </li>
            )}
            <li>
              <div className="nav-login-cart">
                {isLoggedIn
                  ? <button className="login-button" onClick={handleLogout}>Logout</button>
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
          <span role="img" aria-label="search">SEARCH PRODUCTS</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
