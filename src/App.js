import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './frontpage';
import RegisterPage from './accounts/registerpage';
import LoginPage from './accounts/loginpage'
import Dashboard from './components/dashboard'
import NewSubject from './components/newsubject'
import Quiz from './components/quiz'

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
