import React from 'react';
import './Header.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import bacancy_logo from '../../assets/Bacancy-logo-2.png'

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
            <img src={bacancy_logo} className='bacancy-logo' alt="Bacancy Logo"/>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-link">Signup</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
