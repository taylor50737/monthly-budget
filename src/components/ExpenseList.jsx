import "./ExpenseList.css";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) return null;

  return (
    <div className="expense-list">
      <h3>Description</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-left">
              <div>
                <div className="expense-label">{expense.label}</div>
                <div className="expense-date">Date: {expense.date}</div>
              </div>
            </div>
            <div className="expense-right">
              <div className="expense-amount">£{expense.amount.toFixed(2)}</div>
              <div className="expense-actions">
                <button className="edit-btn" onClick={() => onEdit(expense)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
