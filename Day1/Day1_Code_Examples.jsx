// ========================================
// DAY 1: JAVASCRIPT & REACT FUNDAMENTALS
// Complete Code Examples
// ========================================

// ===============================
// FILE 1: src/App.js (Main Component)
// ===============================

import { useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([0]);

  // Event handlers
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
    setHistory([0]);
  };

  // Conditional styling
  const countColor = count > 10 ? 'red' : count < -10 ? 'blue' : 'black';

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
            <button onClick={handleDecrement} className="btn btn-danger">
              -
            </button>
            <button onClick={handleIncrement} className="btn btn-success">
              +
            </button>
            <button onClick={handleReset} className="btn btn-warning">
              Reset
            </button>
          </div>

          <div className="step-control">
            <label htmlFor="step-input">Step Amount: </label>
            <input
              id="step-input"
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              min="1"
              max="100"
            />
          </div>
        </div>

        {/* Challenge 4: Display History */}
        {history.length > 1 && (
          <div className="history">
            <h3>History</h3>
            <p className="history-display">{history.join(' → ')}</p>
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

// ===============================
// FILE 2: src/App.css (Styling)
// ===============================

.App {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.App-header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.App-header h1 {
  font-size: 48px;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.App-header p {
  font-size: 18px;
  margin: 0;
  opacity: 0.9;
}

.counter-section {
  max-width: 600px;
  margin: 0 auto;
}

.counter {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.count-display {
  font-size: 72px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 30px 0;
  transition: color 0.3s ease;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
}

.btn {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0);
}

.btn-success {
  background-color: #4CAF50;
}

.btn-success:hover {
  background-color: #45a049;
}

.btn-danger {
  background-color: #f44336;
}

.btn-danger:hover {
  background-color: #da190b;
}

.btn-warning {
  background-color: #ff9800;
}

.btn-warning:hover {
  background-color: #e68900;
}

.step-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 20px;
  border-top: 2px solid #eee;
}

.step-control label {
  font-weight: bold;
  color: #333;
}

.step-control input {
  width: 60px;
  padding: 8px;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
}

.step-control input:focus {
  outline: none;
  border-color: #764ba2;
  box-shadow: 0 0 5px rgba(118, 75, 162, 0.3);
}

.history {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.history h3 {
  text-align: center;
  color: #667eea;
  margin-top: 0;
}

.history-display {
  word-break: break-all;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #333;
  overflow-x: auto;
}

.footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  opacity: 0.8;
}

.footer p {
  margin: 0;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .App {
    padding: 10px;
  }

  .App-header h1 {
    font-size: 36px;
  }

  .counter {
    padding: 20px;
  }

  .count-display {
    font-size: 48px;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .step-control {
    flex-direction: column;
  }

  .step-control input {
    width: 100%;
  }
}

// ===============================
// FILE 3: src/index.css (Global Styles)
// ===============================

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}

// ===============================
// ES6+ JAVASCRIPT EXAMPLES
// ===============================

// Arrow Functions
const add = (a, b) => a + b;
const double = x => x * 2;
const greet = () => "Hello, Rodrigo!";

// Destructuring
const user = { name: "Rodrigo", age: 30, city: "Curitiba" };
const { name, age, city } = user;

const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

// Template Literals
const message = `Hello, ${name}! You are ${age} years old and live in ${city}.`;

// Spread Operator
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5, 6];

const userData = { name: "Rodrigo", age: 30 };
const updatedUser = { ...userData, age: 31, city: "Curitiba" };

// Async/Await
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// Array Methods (useful in React!)
const numbers2 = [1, 2, 3, 4, 5];

// map: transform each element
const doubled = numbers2.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter: keep only matching elements
const evenOnly = numbers2.filter(n => n % 2 === 0); // [2, 4]

// reduce: combine into single value
const sum = numbers2.reduce((acc, n) => acc + n, 0); // 15

// find: get first matching element
const firstEven = numbers2.find(n => n % 2 === 0); // 2

// ===============================
// REACT PATTERNS
// ===============================

// Pattern 1: Simple Component
const SimpleComponent = () => {
  return <div>Hello, World!</div>;
};

// Pattern 2: Component with Props
const Greeting = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};

// Pattern 3: Component with State
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Pattern 4: Component with Multiple States
const MultiStateComponent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <p>{name}, {age}, {city}</p>
    </div>
  );
};

// Pattern 5: Conditional Rendering
const ConditionalComponent = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please log in</h1>}
    </div>
  );
};

// Pattern 6: List Rendering
const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

// ===============================
// CHALLENGE SOLUTIONS
// ===============================

// Challenge 1 Solution: Reset Button
// Add this to your handleReset function:
const handleReset = () => {
  setCount(0);
};

// Challenge 2 Solution: Step Increment
// Add state: const [step, setStep] = useState(1);
const handleIncrementWithStep = () => {
  setCount(count + step);
};

// Challenge 3 Solution: Color Styling
const getCountColor = (count) => {
  if (count > 10) return "red";
  if (count < -10) return "blue";
  return "black";
};

// Challenge 4 Solution: History Tracking
// Add state: const [history, setHistory] = useState([0]);
const handleIncrementWithHistory = () => {
  const newCount = count + 1;
  setCount(newCount);
  setHistory([...history, newCount]);
};

// ===============================
// TESTING & DEBUGGING TIPS
// ===============================

// Use console.log to debug
const debugExample = () => {
  const myVar = "Hello";
  console.log("Value:", myVar); // Prints in browser console
};

// Use React DevTools extension
// Install: https://chrome.google.com/webstore/detail/react-developer-tools

// Common debugging patterns
const debugState = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = count + 1;
    console.log("Old count:", count);
    console.log("New count:", newCount);
    setCount(newCount);
  };

  return <button onClick={handleClick}>Debug Me</button>;
};

// ===============================
// GIT COMMANDS FOR TODAY
// ===============================

/*
// Initialize git repository
git init

// Add all files to staging area
git add .

// Commit your work
git commit -m "Day 1: First React counter app"

// Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/react-typescript-course.git

// Push to GitHub
git push -u origin main

// Check status
git status

// View commit history
git log
*/

// ===============================
// NEXT STEPS
// ===============================

/*
BEFORE YOU START DAY 2:

1. ✅ Complete all 4 challenges
2. ✅ Get 7-8/8 on the quiz
3. ✅ Make sure code is committed to GitHub
4. ✅ (Optional) Deploy to Vercel for a live URL
5. ✅ Understand useState and how state works
6. ✅ Understand how events work in React
7. ✅ Be comfortable with ES6+ syntax

DAY 2 PREVIEW:
- TypeScript basics and setup
- Typing React components
- Props typing
- Event typing
- Building a typed Todo app
*/
