import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlusSquare, FaChartBar, FaCog, FaUser } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Expense Tracker</h2>
      </div>
      <div className="sidebar-user">
        <div className="user-avatar">
          <FaUser />
        </div>
        <div className="user-info">
          <span className="user-name">Welcome</span>
          <span className="user-email">User</span>
        </div>
      </div>
      <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link">
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/add-expense" className="sidebar-link">
            <FaPlusSquare className="nav-icon" />
            <span>Add Expense</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className="sidebar-link">
            <FaChartBar className="nav-icon" />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <FaCog className="nav-icon" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
