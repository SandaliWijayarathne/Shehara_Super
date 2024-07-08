import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css';
import loginIcon from '../Components/Assets/login_icon.png'

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the LogginSignup page
  };

  const handleLoginClick = () => {
    navigate('/user-profile'); // Navigate to the UserProfile page after logging in
  };

  return (
    <div className='login'>
      <div className="login-container">
        <div className="login-icon">
            <img src={loginIcon} alt="" />
        </div>
        <div className="login-fields">
          <input type="text" placeholder='USERNAME' />
          <input type="password" placeholder='PASSWORD' />
        </div>
        <button onClick={handleLoginClick}>LOGIN</button>
        <p className="login-signup">
          Do not have an account? <span onClick={handleSignUpClick}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
