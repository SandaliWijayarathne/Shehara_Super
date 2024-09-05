import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './UserProfile.css';
import profilePic from '../Assets/UserProfile.jpg';
import visaLogo from '../Assets/visalogo.png';
import envelop from '../Assets/envelope.png';
import tablet from '../Assets/tablet.png';
import ipad from '../Assets/ipad.png';

const UserProfile = () => {
  const location = useLocation();
  const { username } = location.state || {};

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [profileImage, setProfileImage] = useState(profilePic);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (username) {
      setName(username);
    }
  }, [username]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveProfile = () => {
    const authToken = localStorage.getItem('auth-token'); 
  
    // Fetch request to update profile
    fetch('http://localhost:4000/updateprofile', { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken, 
      },
      body: JSON.stringify({
        name: name,
        address: address,
        contactNumber: number,
        cardNumber: cardNumber,
        profileImage: profileImage, 
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(data => {
      console.log('Profile updated:', data);
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    });
  };

  return (
    <div className="user-profile-page App">
      <main className="main">
        <div className="profile-container">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
            onClick={handleProfileImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <section className="profile">
            <div className="profile-info">
              <h2>Profile</h2>
              <div className="profile-field">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="1234 Elm Street Rivertown, Kandy"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Number</label>
                <input
                  type="text"
                  placeholder="0123456789"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>
        <section className="payment-details">
          <div className="payment-info">
            <img src={visaLogo} alt="Visa" />
            <span>Credit Card: </span>
            <input
              type="text"
              placeholder="2344 xxxx xxxx 8880"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        </section>
        <button className="save-button" onClick={handleSaveProfile}>
          Save
        </button>
        <section className="order-section">
          <div>
            <img src={ipad} alt="To Pay" />
            <h3>To Pay</h3>
          </div>
          <div>
            <img src={envelop} alt="To Receive" />
            <h3>To Receive</h3>
          </div>
          <div>
            <img src={tablet} alt="To Review" />
            <h3>To Review</h3>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div>
          <p>&copy; 2024 Shehara Super Market</p>
          <p>No.334/4, Shehara Super Market Colombo Road, Kurunegala</p>
        </div>
        <div>
          <p>+94701397727</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
