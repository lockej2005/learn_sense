import React from 'react';
import { Link } from 'react-router-dom';
import './frontpage.css'; // Import the CSS file for styling

function FrontPage() {
  return (
    <div className="frontpage-container">
      <h1 className="page-title">LearnSense</h1>
      <div className="button-container">
        <Link to="/login" className="register-link">
        <button className="login-button">Login</button>
        </Link>
        <Link to="/register" className="register-link">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default FrontPage;
