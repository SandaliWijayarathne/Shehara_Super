import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/navprofile.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <span className="nav-company-name">Cakes</span>
      </div>
      <div className="nav-right">
        <img src={navProfile} className='nav-profile' alt="Profile" />
      </div>
    </div>
  );
}

export default Navbar;
