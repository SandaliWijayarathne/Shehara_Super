import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import footer_logo from '../Assets/logo.png';
import google_play_icon from '../Assets/google_play_icon.png'; 

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <p>Enter Sri Lanka's freshest online grocery store for all your grocery needs - fresh to frozen and everything in between! Now, you can order ALL your daily necessities from the comfort of your home or anywhere you want! Choose from same-day, next-day & saver to ensure you get what you need when you need it.</p>
      </div>
      <div className='footer-main'>
        <div className='footer-logo'>
          <img src={footer_logo} alt='Shehara Super' />
          <p>Shehara Super</p>
          <p>Shopping for healthy life</p>
          <div className='footer-contact'>
            <p>No.334/ A, Shehara Super Market</p>
            <p>Kandy Road, Kurunegala</p>
            <p>+94701397727</p>
          </div>
        </div>
        <div className='footer-links'>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
              <li><Link to="/delivery">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4>Categories</h4>
            <ul>
              <li><Link to="/category/Vegetables">Vegetables</Link></li>
              <li><Link to="/category/Beverages">Beverages</Link></li>
              <li><Link to="/category/Fruits">Fruits</Link></li>
              <li><Link to="/category/Snacks">Snacks</Link></li>
              <li><Link to="/category/Bakery">Bakery</Link></li>
            </ul>
          </div>
          <div>
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/termsconditions">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/download-app">Download Our App</Link></li>
            </ul>
            <img src={google_play_icon} alt='Google Play' className='google-play-icon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
