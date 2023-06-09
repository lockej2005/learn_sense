import React from 'react';
import {Link} from 'react-router-dom'
import './css/newsubject.css';
import { useLocation } from 'react-router-dom';

function NewSubject() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = searchParams.get('subject');

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to {subject}</h1>
      <div className="welcome-content">
        <p className="welcome-subtitle">
          Get started with your subject by taking a quiz to understand how much you already know.
        </p>
        <Link to="/Quiz">
        <button className="welcome-button">Take Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default NewSubject;
