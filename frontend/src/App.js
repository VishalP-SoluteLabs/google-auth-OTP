import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/auth/Signup/Signup.js';
import OtpVerification from './components/auth/OtpVerification/OtpVerification';
import Login from './components/auth/Login/Login';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import GoogleAuthSuccess from './components/auth/Google Auth/Google Auth Success/googleAuthSuccess';
import GoogleAuthFailure from './components/auth/Google Auth/Google Auth Failure/googleAuthFailure';

function App() {
  return (
    <div className="App">
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/verify-otp' element={<OtpVerification />} />
        <Route path='/google/success' element={<GoogleAuthSuccess />} />
        <Route path='/google/failure' element={<GoogleAuthFailure />}/>
        </Routes>
    </div>
  );
}

export default App;
