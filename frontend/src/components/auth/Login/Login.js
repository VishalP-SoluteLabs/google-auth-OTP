import React, { useState } from 'react';
import './Login.css'; // Make sure to create this CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useContextData } from '../../../context/usersContext';
import bgImage from '../../../assets/Signup_BG.png'; // Update with the actual image path
import bacancyLogo from '../../../assets/Bacancy-logo.png'; // Update with the actual image path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContextData();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
    navigate(`/`); // Update with the appropriate route
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault()
    // googleLogin();
    window.open(`http://localhost:8080/google`, '_self')
  };

  return (
    <div className='login-container'>
      <div className='image-container'>
        <img src={bgImage} alt='company-message' className='bg-image' />
        <img src={bacancyLogo} className='image-overlay-login' alt='bacancy-logo' />
      </div>
      <div className='login-form-container'>
        <h3 className='login-title'>Login to your account</h3>
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your Email'
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Your Password'
            value={password}
            onChange={handlePasswordChange}
          />

          <button type='submit' className='login-button'>
            <Link
              to={`/`} // Update with the appropriate route
              style={{
                textDecoration: 'none',
                color: 'white',
                width: '100%',
              }}
            >
              Login
            </Link>
          </button>
          <br />
        </form>
        <div className='google-login-button'>
          <button type='button' className='google-login-button' onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
