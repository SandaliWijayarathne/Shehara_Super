import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './CSS/Login.css';

const LogginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false); 

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAgreement = (e) => {
    setIsAgreed(e.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};
    if (state === "Sign Up" && !formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const login = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    let responseData;
    await fetch('http://localhost:4000/api/users/login', { // Fixed endpoint
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    if (!isAgreed) { 
      alert('You must agree to the terms and conditions');
      return;
    }

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    let responseData;
    await fetch('http://localhost:4000/api/users/signup', { // Fixed endpoint
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  // Handle Google Login Success
  const responseGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem('auth-token', token);
    window.location.replace('/');
  };

  // Handle Google Login Failure
  const responseGoogleFailure = (error) => {
    console.error("Google Sign In was unsuccessful. Try again later", error);
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                name='username'
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder='Your Name'
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </>
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
        ) : (
          <p className="loginsignup-login">Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
        )}
        {state === "Sign Up" && (
          <div className="loginsignup-agree">
            <input type="checkbox" onChange={handleAgreement} />
            <p>I agree to the terms and conditions</p>
          </div>
        )}
        <GoogleLogin
          onSuccess={responseGoogleSuccess}
          onError={responseGoogleFailure}
        />
      </div>
    </div>
  );
}

export default LogginSignup;
