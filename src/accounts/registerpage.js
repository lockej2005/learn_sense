import React from 'react';
import './registerpage.css'; // Import the CSS file for styling

function RegisterPage() {
  return (
    <div className="register-container">
      <h1 className="page-title">Register</h1>
      <form className="register-form">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" />
        <br />
        <label htmlFor="idNumber">ID Number:</label>
        <input type="text" id="idNumber" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="email">Password:</label>
        <input type="text" id="password" />
        <br />
        <label htmlFor="school">School:</label>
        <input type="text" id="school" />
        <br />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
