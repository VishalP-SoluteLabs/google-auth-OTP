import React, { useState } from 'react';
import './Signup.css';
import bgImage from '../../../assets/Signup_BG.png';
import bacancyLogo from '../../../assets/Bacancy-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContextData } from '../../../context/usersContext';

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { signup } = useContextData()

  const handleSubmit = (event) => {
    event.preventDefault();
    
    signup({name, email, password})
    navigate(`/verify-otp`)
  };

  return (
    <div className='signup-container'>
      <div className='image-container'>
        <img src={bgImage} alt='company-message' className='bg-image' />
        <img src={bacancyLogo} className='image-overlay-signup' alt='bacancy-logo'/>
      </div>
      <div className='signup-form-container'>
        <h3 className='register-title'>Register your account</h3>
        <h5 className='register-desc'>
          Fill the details below to submit register account.
        </h5>
        <form className='signup-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value )}
          />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)
            }
          />

          <button type='submit' className='signup-button'>
            <Link
              to={`/verify-otp`}
              style={{ textDecoration: 'none', color: 'white', width: '45px' }}
            >
              Continue
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
