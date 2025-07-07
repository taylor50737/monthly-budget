import { useState } from "react";
import "./AddExpenseModal.css";

export default function AddExpenseModal({ onClose, onAdd, initialData }) {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [label, setLabel] = useState(initialData?.label || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !label || !category) return;

    const updatedExpense = {
      id: initialData?.id || Date.now(),
      amount: parseFloat(amount),
      label,
      category,
      date: initialData?.date || new Date().toISOString().split("T")[0],
    };

    onAdd(updatedExpense);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>✕</button>
        <h2>
          <span>MONTHLY</span> EXPENSE
        </h2>
        <p>Insert Below Your Current Spent</p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Insert The Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name For Expenses"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Health">Health</option>
            <option value="Hobby">Hobby</option>
            <option value="Savings">Savings</option>
            <option value="Debts">Debts</option>
          </select>
          <button type="submit" className="add-btn">
            {initialData ? "Update Expense" : "Add New Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}
