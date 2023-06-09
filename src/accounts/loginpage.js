import React from 'react';
import './registerpage.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="register-container">
      <h1 className="page-title">Login</h1>
      <form className="register-form">
        <label htmlFor="school">School:</label>
        <input type="text" id="school" className="textbox" />
        <br />
        <label htmlFor="id-number">ID Number:</label>
        <input type="text" id="id-number" className="textbox" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="textbox" />
        <br />
        <div className="button-container">
        <Link to="/Dashboard" className="register-link">
          <button type="submit" className="register-button">
            Login
          </button>
        </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
