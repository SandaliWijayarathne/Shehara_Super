import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/navprofile.jpg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-left">
        <Link to="/dashboard" className="nav-logo-link">
          <img src={navlogo} alt="Logo" className="nav-logo" />
          <span className="nav-company-name">Shehara Super</span>
        </Link>
      </div>
      <div className="nav-right">
        <img src={navProfile} className='nav-profile' alt="Profile" />
      </div>
    </div>
  );
}

export default Navbar;
