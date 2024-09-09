import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';  // New package
import { useNavigate } from 'react-router-dom';
import '../LoginSignup/LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/user-profile');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const responseGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem('auth-token', token);
    window.location.replace('/');
  };

  const responseGoogleFailure = (error) => {
    console.error("Google Sign In was unsuccessful. Try again later", error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
          <GoogleLogin
            onSuccess={responseGoogleSuccess}
            onError={responseGoogleFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginSignup;
