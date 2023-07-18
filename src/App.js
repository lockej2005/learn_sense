import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './frontpage.js';
import RegisterPage from './accounts/registerpage.js';
import LoginPage from './accounts/loginpage.js'
import Dashboard from './components/dashboard.js'
import NewSubject from './components/newsubject.js'
import Quiz from './components/quiz.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/NewSubject" element={<NewSubject />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
