import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/expenses/1")
      .then((response) => setExpenses(response.data.expenses))
      .catch((error) => console.error(error));
  }, []);

  const addExpense = () => {
    axios.post("http://localhost:8000/add_expense/", {
      user_id: 1,
      category,
      amount: parseFloat(amount),
      description: "Miscellaneous"
    })
    .then(() => window.location.reload());
  };

  return (
    <div>
      <h1>Financial Assistant</h1>
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={addExpense}>Add Expense</button>
      
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.category}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
