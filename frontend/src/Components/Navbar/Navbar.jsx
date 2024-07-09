import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    if (query.trim() === '') return;
    const response = await fetch(`/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  };

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
        <input
          type="text"
          placeholder="Search Products"
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((item) => (
              <li key={item._id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
