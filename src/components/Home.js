import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";


function Home() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Food", "Entertainment", "Transport", "Health", "Bills"];

  useEffect(() => {
    // Fetch expenses from localStorage
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  const saveToLocalStorage = (updatedExpenses) => {
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const addExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title,
      amount,
      category,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);
  };

  const editExpense = (id, newTitle, newAmount, newCategory) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, title: newTitle, amount: newAmount, category: newCategory }
        : expense
    );
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);
  };

  return (
    <div className="home">
      <h1>Expense Tracker</h1>
      
      <form onSubmit={addExpense} className="expense-form">
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
        <button type="submit">Add Expense</button>
      </form>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-details">
              <span className="expense-title">{expense.title}</span>
              <span className="expense-amount">${expense.amount}</span>
              <span className="expense-category">{expense.category}</span>
            </div>
            <div className="expense-actions">
              <button
                className="edit-btn"
                onClick={() => editExpense(expense.id, "New Title", 100, "Updated Category")}
              >
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
