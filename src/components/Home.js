import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaChartPie, FaMoneyBillWave, FaCalendarAlt, FaSearch, FaFilter, FaPlus, FaUsers, FaEnvelope } from "react-icons/fa";
import Header from './Header';
import Navigation from './Navigation';
import AddExpense from './AddExpense';
import About from './About';
import Contact from './Contact';

function Home() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 150.00, category: 'food', date: '2024-03-15' },
    { id: 2, description: 'Movie Tickets', amount: 45.00, category: 'entertainment', date: '2024-03-14' },
    { id: 3, description: 'Gas', amount: 60.00, category: 'transport', date: '2024-03-13' },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Food", "Entertainment", "Transport", "Health", "Bills", "Shopping", "Other"];

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  const saveToLocalStorage = (updatedExpenses) => {
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const addExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      saveToLocalStorage(updatedExpenses);
    }
  };

  const openEditModal = (expense) => {
    setIsEditing(true);
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setShowModal(true);
  };

  const updateExpense = (e) => {
    e.preventDefault();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? { ...expense, title, amount: parseFloat(amount), category, date }
        : expense
    );
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);

    setIsEditing(false);
    setEditingExpense(null);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditingExpense(null);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return total + amount;
    }, 0);
  };

  const getCategoryTotal = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => {
        const amount = parseFloat(expense.amount) || 0;
        return total + amount;
      }, 0);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedAndFilteredExpenses = expenses
    .filter(expense => {
      if (!expense || !expense.description) return false;
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "date") {
        return order * (new Date(a.date) - new Date(b.date));
      } else if (sortBy === "amount") {
        return order * (parseFloat(a.amount) - parseFloat(b.amount));
      } else if (sortBy === "category") {
        return order * a.category.localeCompare(b.category);
      }
      return 0;
    });

  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="app-container">
      <Navigation />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <h1>Welcome to Expense Tracker</h1>
              <p>Take control of your finances with our intuitive expense tracking solution</p>
            </div>
            <div className="hero-image">
              <img src="/expense-tracker-hero.jpg" alt="Expense Tracker" />
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="dashboard-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <FaChartPie />
              </div>
              <div className="summary-content">
                <h3>Total Expenses</h3>
                <p>${getTotalExpenses().toFixed(2)}</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <FaChartPie />
              </div>
              <div className="summary-content">
                <h3>This Month</h3>
                <p>${getCategoryTotal("Food").toFixed(2)}</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <FaChartPie />
              </div>
              <div className="summary-content">
                <h3>Average Daily</h3>
                <p>${(getTotalExpenses() / 30).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Add Expense Form */}
          <AddExpense onAddExpense={handleAddExpense} />

          {/* Expense List Section */}
          <div className="expense-section">
            <div className="expense-controls">
              <div className="search-filter">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="filter-box">
                  <FaFilter className="filter-icon" />
                  <select value={selectedCategory} onChange={handleCategoryFilter}>
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="expense-list">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("date")} className="sortable">
                      Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Description</th>
                    <th onClick={() => handleSort("amount")} className="sortable">
                      Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("category")} className="sortable">
                      Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAndFilteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.description}</td>
                      <td>${(parseFloat(expense.amount) || 0).toFixed(2)}</td>
                      <td>
                        <span className={`category-badge ${expense.category.toLowerCase()}`}>
                          {expense.category}
                        </span>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(expense)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(expense.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* About Section */}
          <About />

          {/* Contact Section */}
          <Contact />

          {/* Edit Modal */}
          {showModal && (
            <div className="edit-modal">
              <div className="modal-content">
                <h2>Edit Expense</h2>
                <form onSubmit={updateExpense}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount:</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="update-btn">Update Expense</button>
                    <button type="button" onClick={closeEditModal} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
