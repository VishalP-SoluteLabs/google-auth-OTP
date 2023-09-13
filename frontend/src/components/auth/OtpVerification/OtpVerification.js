import React, { useState } from 'react';
import './OtpVerification.css';
import bgImage from '../../../assets/Signup_BG.png';
import { useContextData } from '../../../context/usersContext';
import toast, { Toaster } from 'react-hot-toast';
import bacancyLogo from '../../../assets/Bacancy-logo.png';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [enteredOtp, setOTP] = useState(Array(6).fill(''));
    const { email, verifyOTP } = useContextData();
    const navigate = useNavigate();

  const handleOTPChange = (index, value) => {
    const newOTP = [...enteredOtp];
    newOTP[index] = value;
    setOTP(newOTP);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const receivedOtp = enteredOtp.join("");
    
    const promise = verifyOTP({ email, receivedOtp });

    toast.promise(
      promise,
      {
        loading: 'Verifying OTP...',
        success: 'OTP Verified!',
        error: 'OTP Verification Failed!',
      }
    );

    navigate('/login');
    // try {
    //   await promise;
    // } catch (error) {
    //   // Handle the error if needed
    // }
  };

  return (
    <div className='otp-container'>
      <div>
        <img src={bgImage} alt='company-message' className='bg-image' />
        <img src={bacancyLogo} className='image-overlay-otp' alt='bacancy-logo' />
      </div>
      <div className='otp-verification-container'>
        <h1 className='otp-title'>Enter the OTP which we sent to your mail.</h1>
        <form onSubmit={handleSubmit}>
          <div className='otp-input-container'>
            {enteredOtp.map((digit, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                placeholder='___'
                value={digit}
                className='otp-input'
                onChange={(e) => handleOTPChange(index, e.target.value)}
              />
            ))}
          </div>
          <button type='submit' className='otpButton'>Verify</button>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
        }}
        reverseOrder={true}
      />
    </div>
  );
};

export default OtpVerification;
