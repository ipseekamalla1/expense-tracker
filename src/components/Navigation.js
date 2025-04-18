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
        <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link">
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="sidebar-link">
            <span>About Us</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="sidebar-link">
            <span>Contact Us</span>
          </Link>
        </li>
      </ul>
      </ul>
    </nav>
  );
}

export default Navigation; 