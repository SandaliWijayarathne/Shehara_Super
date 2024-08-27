import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <ul className={`nav-menu ${menuOpen ? 'nav-menu-visible' : ''}`} ref={menuRef}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/location">Location</Link></li>
            <li>
              <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                  ? <button className="login-button" onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
                  : <Link to='/login'><button className="login-button">Login</button></Link>}
                <Link to='/cart'></Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search products..." />
        <button className="search-button">
          <span role="img" aria-label="search">SEARCH PRODUCTS🔍</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
