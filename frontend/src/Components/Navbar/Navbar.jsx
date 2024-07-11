import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.png';

const Navbar = () => {
  // const { cartItems } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const getTotalCartCount = () => {
  //   return Object.values(cartItems).reduce((total, count) => total + count, 0);
  // };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <ul className={`nav-menu ${menuOpen ? 'nav-menu-visible' : ''}`} ref={menuRef}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/delivery">Delivery</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>
      <div className="search-bar-container">
        <input type="text" placeholder="Search Products" className="search-bar" />
      </div>
    </div>
  );
};

export default Navbar;
