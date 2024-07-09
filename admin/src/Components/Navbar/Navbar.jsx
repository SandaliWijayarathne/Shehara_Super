// import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/navprofile.jpg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <span className="nav-company-name">Shehara Super</span>
      </div>
      <div className="nav-right">
        <img src={navProfile} className='nav-profile' alt="Profile" />
      </div>
    </div>
  );
}

export default Navbar;
