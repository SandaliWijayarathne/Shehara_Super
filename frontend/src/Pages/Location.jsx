import React from 'react';
import './CSS/Location.css';

const Location = () => {
  return (
    <div className="location-container">
      <div className="location-content">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.364249159711!2d79.90534936790688!3d7.535192793985026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2cf0cd88d66df%3A0x40c7a48453776352!2sShehara%20stores!5e0!3m2!1sen!2slk!4v1718371775479!5m2!1sen!2slk"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shehara Supermarket Location"
            alt="location google map"
          ></iframe>
        </div>
        <div className="shop-details">
          <h1>Shehara Supermarket</h1>
          <hr />
          <h2>Contact Us</h2>
          <p><strong>Phone:</strong> +94 701 397 727</p>
          <p><strong>Email:</strong> sheharasuper@gmail.com</p>
          <h2>Address</h2>
          <p>No.175, Kandy Road,</p>
          <p>Kurunegala</p>
          <h2>Opening Hours</h2>
          <p>Everyday: 8.00 am to 11 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Location;
