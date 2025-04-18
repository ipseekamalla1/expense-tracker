import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaChartPie, FaSearch, FaFilter } from "react-icons/fa";
import Header from './Header';
import Navigation from './Navigation';
import AddExpense from './AddExpense';
import Footer from './Footer';
import "../styles/styles.css"

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Food", "Entertainment", "Transport", "Health", "Bills", "Shopping", "Other"];

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
    }
  };

  const openEditModal = (expense) => {
    setIsEditing(true);
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
  };

  const updateExpense = (e) => {
    e.preventDefault();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? { ...expense, description, amount: parseFloat(amount), category, date }
        : expense
    );
    console.log("efwf",updateExpense);
    
    setExpenses(updatedExpenses);

    setIsEditing(false);
    setEditingExpense(null);
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditingExpense(null);
    setDescription("");
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

  const getTotalExpensesForThisMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based month (0 = January, 11 = December)
    const currentYear = currentDate.getFullYear();

    // Filter expenses to get only those from the current month and year
    const thisMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth
      );
    });

    // Sum the amounts of the filtered expenses
    const total = thisMonthExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return total;
  };



  const sortedAndFilteredExpenses = expenses
    .filter(expense => {
      const description= expense.description ? expense.description.toLowerCase() : "";
      const matchesSearch = description.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="app-container">
      <Navigation />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Welcome to Expense Tracker</h1>
              </div>
              <div className="hero-image">
                <img src="/images/expense.jpg" alt="Expense Tracker" />
              </div>
            </div>
          </div>

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
                <p>${getTotalExpensesForThisMonth().toFixed(2)}</p>
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

          <AddExpense onAddExpense={handleAddExpense} />

          <div className="expense-section">
            <div className="expense-controls">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    {console.log(expense)}
                    <td>{expense.description}</td>
                    <td>${parseFloat(expense.amount).toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button onClick={() => openEditModal(expense)}><FaEdit /></button>
                      <button onClick={() => deleteExpense(expense.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditing && (
            <div className="edit-modal">
              <div className="modal-content">
                <h2>Edit Expense</h2>
                <form onSubmit={updateExpense}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                        <option key={cat} value={cat}>{cat}</option>
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
        <Footer />
      </div>
    </div>
  );
}

export default Home;
