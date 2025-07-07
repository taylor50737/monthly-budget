import { useEffect, useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseList from "../components/ExpenseList";
import "./HomePage.css";

export default function HomePage() {
  const [user, setUser] = useState({ income: 0, name: "" });
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData"));
    if (stored) setUser(stored);
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const available = user.income - totalSpent;
  const percentSpent = user.income
    ? Math.round((totalSpent / user.income) * 100)
    : 0;

  const handleAddOrUpdateExpense = (newExpense) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === editingExpense.id ? newExpense : e))
      );
    } else {
      setExpenses((prev) => [...prev, newExpense]);
    }
    setEditingExpense(null);
    setShowModal(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleReset = () => {
    setExpenses([]);
  };

  return (
    <div className="tracker-page">
      <header className="tracker-header">
        <div className="tracker-title">
          <span className="highlight">Expenses</span> Monthly Budget
        </div>
        <button className="tracker-add-btn" onClick={() => setShowModal(true)}>
          New Expense
        </button>
        <div className="tracker-welcome">Welcome {user.name}!</div>
      </header>

      <main className="tracker-main">
        {expenses.length === 0 ? (
          <div className="tracker-empty">
            <h2>
              Looks Like You Haven’t <span>Added Any Expenses Yet.</span>
            </h2>
            <p>No worries, just hit the 'Add' button to get started.</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        )}

        <div className="tracker-summary">
          <h3>Calculation</h3>
          <div className="summary-income">
            INCOME
            <br />£{user.income}
          </div>

          <div className="summary-meter">
            <div className="summary-percent">
              {percentSpent}%<br />
              Spent
            </div>
          </div>

          <div className="summary-breakdown">
            <div>AVAILABLE: £{available}</div>
            <div>SPENT: £{totalSpent}</div>
          </div>

          <button className="summary-reset-btn" onClick={handleReset}>
            Reset Expenses
          </button>
        </div>
      </main>

      {showModal && (
        <AddExpenseModal
          onClose={() => {
            setShowModal(false);
            setEditingExpense(null);
          }}
          onAdd={handleAddOrUpdateExpense}
          initialData={editingExpense}
        />
      )}
    </div>
  );
}
