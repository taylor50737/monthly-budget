import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const [income, setIncome] = useState("");
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify({ income, name, goals }));
    navigate("/home");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-left">
        <h2>
          Calculate Smarter,
          <br />
          Spend Wiser ...
        </h2>
        {/* You can also add an illustration here if available */}
      </div>

      <div className="welcome-right">
        <form onSubmit={handleSubmit} className="welcome-form">
          <h1>
            Monthly <span>Budget</span>
          </h1>

          <input
            placeholder="Insert Your Income"
            id="income-input"
            name="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />

          <input
            placeholder="Insert Your Name"
            id="name-input"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Insert Your Goals"
            id="goals-input"
            name="goals"
            type="text"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />

          <button type="submit">Start Your Calculation</button>
        </form>
      </div>
    </div>
  );
}
