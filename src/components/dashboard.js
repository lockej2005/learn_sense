import React, { useState } from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

function DashboardPage() {
const [selectedSubject, setSelectedSubject] = useState('');

const handleTileClick = (title) => {
setSelectedSubject(title);
};

return (
<div className="dashboard-container">
    <h1 className="dashboard-title">Student Portal</h1>
    <div className="tiles-container">
    <Link
        to={`/NewSubject?subject=5 Maths`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 Maths')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 Maths</h2>
        <p className="tile-subtitle">MTH-501</p>
        </div>
    </Link>
    <Link
        to={`/NewSubject?subject=5 English`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 English')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 English</h2>
        <p className="tile-subtitle">ENG-503</p>
        </div>
    </Link>
    <Link
        to={`/NewSubject?subject=5 Geography`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 Geography')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 Geography</h2>
        <p className="tile-subtitle">GEO-501</p>
        </div>
    </Link>
    <Link
        to={`/NewSubject?subject=5 Digital Tech`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 Digital Tech')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 Digital Tech</h2>
        <p className="tile-subtitle">DIG-501</p>
        </div>
    </Link>
    <Link
        to={`/NewSubject?subject=5 Religion`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 Religion')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 Religion</h2>
        <p className="tile-subtitle">REL-501</p>
        </div>
    </Link>
    <Link
        to={`/NewSubject?subject=5 Business`}
        className="dashboard-tile"
        onClick={() => handleTileClick('5 Business')}
    >
        <div className="tile-content">
        <h2 className="tile-title">5 Business</h2>
        <p className="tile-subtitle">BUS-501</p>
        </div>
    </Link>
    </div>
</div>
);
}

export default DashboardPage;
