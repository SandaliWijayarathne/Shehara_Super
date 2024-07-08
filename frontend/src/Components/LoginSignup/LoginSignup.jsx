import React from 'react';
import '../LoginSignup/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    console.log('Create Account button clicked');
    navigate('/user-profile'); // Navigate to the UserProfile page after account creation
  };

  const handleSignInClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Create An Account</h1>
        <p>Create an account to enjoy all products and services</p>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
        <button onClick={handleCreateAccount}>Create Account</button>
        <p className="loginsignup-login">
          Already Have An Account? <span onClick={handleSignInClick}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
