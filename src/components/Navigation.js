import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaChartPie, 
  FaInfoCircle, 
  FaEnvelope,
  FaFileAlt 
} from 'react-icons/fa';

function Navigation() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Expense Tracker</h2>
      </div>
      
      <div className="sidebar-user">
        <div className="user-avatar">
          <span>IM</span>
        </div>
        <div className="user-info">
          <div className="user-name">Ipseeka Malla</div>
          <div className="user-email">ID: 8959723</div>
        </div>
      </div>

      <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link">
            <FaChartPie className="nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="sidebar-link">
            <FaInfoCircle className="nav-icon" />
            <span>About Us</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="sidebar-link">
            <FaEnvelope className="nav-icon" />
            <span>Contact Us</span>
          </Link>
        </li>
        <li>
          <Link to="/new-page" className="sidebar-link">
            <FaFileAlt className="nav-icon" />
            <span>Cover Page</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation; 