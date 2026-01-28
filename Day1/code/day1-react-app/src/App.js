import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([0]);

  const handleIncrement = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleDecrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleReset = () => {
    setCount(0);
  };

  // Conditional styling
  const countColor = count > 10 ? "blue" : count < -10 ? "red" : "black";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React! 🚀</h1>
        <p>Day 1: Building your first interactive component</p>
      </header>

      <main className="counter-section">
        <div className="counter">
          <p style={{ color: countColor }} className="count-display">
            Count: {count}
          </p>
          <div className="button-group">
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>

        <div className="step-control">
          <label htmlFor="step-input">Step Amount: </label>
          <input
            id="step-input"
            type="number"
            value={step}
            min="1"
            max="100"
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </div>

        {/* Challenge 4: Display History */}
        {history.length > 1 && (
          <div className="history">
            <h3>History</h3>
            <p className="history-display">{history.join(" → ")}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Keep learning! Next: Day 2 - TypeScript Essentials</p>
      </footer>
    </div>
  );
}

export default App;
