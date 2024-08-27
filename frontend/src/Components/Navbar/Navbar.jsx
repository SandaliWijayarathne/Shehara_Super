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

  return (
    <div className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <button className="menu-toggle" onClick={toggleMenu}>
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
  );
};

export default Navbar;
