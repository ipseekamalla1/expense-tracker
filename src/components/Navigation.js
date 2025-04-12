import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartPie, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Navigation() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Expense Tracker</h2>
      </div>
      
      <div className="sidebar-user">
        <div className="user-avatar">
          <span>JD</span>
        </div>
        <div className="user-info">
          <div className="user-name">User</div>
          <div className="user-email">user@example.com</div>
        </div>
      </div>

      <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link active">
            <FaHome className="nav-icon" />
            Dashboard
          </Link>
        </li>
        
        <li>
          <Link to="/settings" className="sidebar-link">
            <FaCog className="nav-icon" />
            Settings
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navigation; 