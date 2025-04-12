import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';

function Header() {
  return (
    <header className="main-header">
      <div className="header-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="header-actions">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <div className="header-user">
          <div className="user-avatar small">
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 