import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
  const [cardError, setCardError] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (username) {
      setName(username);
    }

    // Load user profile from localStorage if it exists
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) {
      setName(savedProfile.name || '');
      setAddress(savedProfile.address || '');
      setNumber(savedProfile.contactNumber || '');
      setCardNumber(savedProfile.cardNumber || '');
      setProfileImage(savedProfile.profileImage || profilePic);
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

  const handleCardNumberChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and enforce 16 digits
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
      setCardError(value.length === 16 ? '' : 'Card number must be exactly 16 digits');
    }
  };

  const handleSaveProfile = () => {
    if (cardNumber.length !== 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    const authToken = localStorage.getItem('auth-token'); 
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('contactNumber', number);
    formData.append('cardNumber', cardNumber);

    // Check if a file is selected and append it
    if (fileInputRef.current.files[0]) {
      formData.append('profileImage', fileInputRef.current.files[0]);
    }

    fetch('http://localhost:4000/updateprofile', { 
      method: 'PUT',
      headers: {
        'auth-token': authToken, 
      },
      body: formData // Send the FormData object
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

      // Save updated profile information in localStorage
      const updatedProfile = {
        name,
        address,
        contactNumber: number,
        cardNumber,
        profileImage: profileImage // Save the base64 string
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
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
              onChange={handleCardNumberChange}
            />
            {cardError && <p className="error-text">{cardError}</p>}
          </div>
        </section>
        <button className="save-button" onClick={handleSaveProfile}>
          Save
        </button>
        <section className="order-section">
          <div>
            <Link to="/cart">
              <img src={ipad} alt="To Pay" />
            </Link>
            <h3>To Pay</h3>
          </div>
          <div>
            <Link to="/delivery">
              <img src={envelop} alt="To Receive" />
            </Link>
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
