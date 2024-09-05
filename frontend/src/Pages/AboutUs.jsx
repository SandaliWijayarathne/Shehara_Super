import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/AboutUs.css';
import logo from '../Components/Assets/logo.png';

const About = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleBrowseStoreClick = () => {
    navigate('/');
  };

  const handleLocateUsClick = () => {
    navigate('/location');
  };

  const handleSuperDealsClick = () => {
    navigate('/'); 
  };

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-left">
          <h2>About</h2>
          <p>
            “ Discover Shehara Super Market, your ultimate shopping destination.
            With a wide range of high-quality products we provide convenience and excellence.
            Our friendly staff and multiple locations ensure a seamless shopping experience.
            Experience the difference at Shehara Super Market today. ”
          </p>
          <button onClick={handleBrowseStoreClick}>Explore</button>
        </div>
        <div className="about-right">
          <img src={logo} alt="Shehara Super" className="about-logo" />
        </div>
      </div>

      <div className="info-cards">
        <div className="info-card" onClick={handleLoginClick}>
          <h3>Login Here</h3>
        </div>
        <div className="info-card" onClick={handleBrowseStoreClick}>
          <h3>Browse the Store</h3>
        </div>
        <div className="info-card" onClick={handleLocateUsClick}>
          <h3>Locate Us</h3>
        </div>
        <div className="info-card" onClick={handleSuperDealsClick}>
          <h3>Super Deals</h3>
        </div>
      </div>
    </div>
  );
}

export default About;
