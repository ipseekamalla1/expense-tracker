import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlusSquare } from "react-icons/fa"; // FontAwesome icons

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/add-expense" className="sidebar-link">
            <FaPlusSquare /> Add Expense
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
