# Day 1: JavaScript Fundamentals & Your First React App

**Duration**: 3-5 hours  
**Skill Level**: Beginner  
**Goal**: Set up your environment and build your first React component  
**Outcome**: A working React app deployed to GitHub

---

## Part 1: Quick JS ES6+ Review (30 minutes)

Since you have Android development experience, these concepts will feel familiar. We'll move quickly.

### 1.1 Modern JavaScript (ES6+) Essentials

#### const and let (not var!)
```javascript
// ❌ OLD (don't use)
var name = "Rodrigo";

// ✅ MODERN
const name = "Rodrigo";  // Use this (can't be reassigned)
let age = 30;             // Use this (can be reassigned)
```

**Why?**
- `const` prevents accidental reassignment
- `let` has proper block scope (like Android's scoping)
- `var` has weird hoisting behavior

#### Arrow Functions
```javascript
// ❌ OLD
function add(a, b) {
  return a + b;
}

// ✅ MODERN
const add = (a, b) => {
  return a + b;
};

// ✅ SHORTER (implicit return)
const add = (a, b) => a + b;

// ✅ SINGLE PARAMETER (no parens needed)
const double = x => x * 2;
```

**Android parallel**: Think of arrow functions like Kotlin lambdas or Java method references.

#### Template Literals
```javascript
// ❌ OLD
const greeting = "Hello " + name + ", you are " + age + " years old";

// ✅ MODERN
const greeting = `Hello ${name}, you are ${age} years old`;
```

#### Destructuring (VERY useful!)
```javascript
// Object destructuring
const user = { name: "Rodrigo", age: 30, city: "Curitiba" };
const { name, age } = user;  // Extract properties
console.log(name); // "Rodrigo"

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first); // "red"

// Function parameters
const printUser = ({ name, age }) => {
  console.log(`${name} is ${age}`);
};
printUser(user); // "Rodrigo is 30"
```

#### Spread Operator
```javascript
// Copying arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Copying objects
const user = { name: "Rodrigo", age: 30 };
const updatedUser = { ...user, age: 31 };  // { name: "Rodrigo", age: 31 }
```

#### Promises & Async/Await
```javascript
// Fetching data (basic)
const fetchUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
};
```

**Android parallel**: Think of `async/await` like coroutines or RxJava observables.

---

## Part 2: Understanding React Basics (45 minutes)

### 2.1 What is React?

React is a JavaScript library for building user interfaces with **components**.

**Key idea**: Build your UI as reusable, independent pieces.

### 2.2 JSX: JavaScript XML

JSX lets you write HTML-like code in JavaScript:

```javascript
// JSX (what we write)
const greeting = <h1>Hello, {name}!</h1>;

// What it becomes (compiled)
const greeting = React.createElement('h1', null, `Hello, ${name}!`);
```

**JSX Rules**:
1. Return a single element (wrap in `<>` if needed)
2. Use `className` instead of `class`
3. Use `camelCase` for attributes (`onClick`, not `onclick`)
4. Close all tags (self-closing tags need `/>`

```javascript
// ✅ CORRECT
const Card = () => {
  return (
    <div className="card">
      <h1>Title</h1>
      <img src="image.png" />
    </div>
  );
};

// ❌ WRONG (multiple root elements)
const Bad = () => {
  return (
    <h1>Title</h1>
    <p>Description</p>
  );
};

// ✅ FIX (wrap in fragment)
const Good = () => {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
};
```

### 2.3 Components

A React component is a JavaScript function that returns JSX.

```javascript
// Functional Component (this is what we use)
const Welcome = () => {
  return <h1>Welcome to React!</h1>;
};

// With Props (like function parameters)
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Usage
<Greeting name="Rodrigo" />
```

### 2.4 Props (Component Arguments)

Props are how you pass data to components:

```javascript
const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

// Usage
<Card 
  title="React Guide"
  description="Learn React basics"
  imageUrl="/react.png"
/>
```

### 2.5 Events

Handle user interactions:

```javascript
const Button = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
};

// With parameters
const Counter = () => {
  const handleIncrement = (amount) => {
    console.log("Incrementing by", amount);
  };

  return <button onClick={() => handleIncrement(1)}>+1</button>;
};
```

---

## Part 3: Setting Up Your First React App (30 minutes)

### Step 1: Install Node.js (if not already installed)

Download from: https://nodejs.org/ (Get the LTS version)

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Create Your First React App

Open your terminal/command prompt and run:

```bash
npx create-react-app day1-react-app
cd day1-react-app
```

This creates a new React project with:
- ✅ All dependencies installed
- ✅ Build tools configured
- ✅ Example code ready to modify

### Step 3: Start the Development Server

```bash
npm start
```

Your browser should open to `http://localhost:3000` automatically!

You'll see the React welcome page. Now let's modify it.

### Step 4: Project Structure

```
day1-react-app/
├── public/
│   └── index.html          (Main HTML file)
├── src/
│   ├── App.js              (Main component - EDIT THIS)
│   ├── App.css             (Styles)
│   ├── index.js            (Entry point)
│   └── index.css           (Global styles)
├── package.json            (Dependencies)
└── README.md
```

---

## Part 4: Your First Component (45 minutes)

### Step 1: Create a Simple Component

Open `src/App.js` and replace everything with:

```javascript
function App() {
  return (
    <div className="App">
      <h1>Welcome to React, Rodrigo! 🚀</h1>
      <p>Day 1: Building your first React app</p>
    </div>
  );
}

export default App;
```

Save the file. Your browser should update automatically!

### Step 2: Let's Make It Interactive

Modify `App.js`:

```javascript
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="App">
      <h1>Welcome to React! 🚀</h1>
      <p>This is your first interactive component</p>

      <div className="counter">
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
```

### What's Happening?

1. **`import { useState }`** - Import the useState hook from React
2. **`useState(0)`** - Creates a state variable `count` starting at 0
3. **`setCount`** - Function to update the count
4. **`onClick={handleIncrement}`** - Attach event handlers to buttons
5. **`{count}`** - Display the current count in JSX

### Step 3: Add Some Styling

Replace `src/App.css`:

```css
.App {
  text-align: center;
  max-width: 600px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

h1 {
  color: #1F4E78;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 16px;
}

.counter {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.counter p {
  font-size: 32px;
  font-weight: bold;
  color: #1F4E78;
}

button {
  background-color: #1F4E78;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2E5C8A;
}

button:active {
  transform: scale(0.95);
}
```

Now your counter should look professional! 🎨

---

## Part 5: Hands-On Challenges (60 minutes)

### Challenge 1: Add a Reset Button (Easy)

**Goal**: Add a "Reset" button that sets count back to 0

**Hint**: Create a `handleReset` function

```javascript
const handleReset = () => {
  setCount(0);
};
```

Then add the button:
```javascript
<button onClick={handleReset}>Reset</button>
```

### Challenge 2: Add a Step Increment (Medium)

**Goal**: Instead of always incrementing by 1, let user choose the step amount

**Hint**: Add another state variable for step
```javascript
const [step, setStep] = useState(1);
```

Then add an input field:
```javascript
<input 
  type="number" 
  value={step}
  onChange={(e) => setStep(Number(e.target.value))}
/>
```

Update increment to use step:
```javascript
const handleIncrement = () => {
  setCount(count + step);
};
```

### Challenge 3: Add Styling for Limits (Medium)

**Goal**: If count > 10, display red text. If count < -10, display blue text

**Hint**: Use a conditional className
```javascript
const countColor = count > 10 ? 'red' : count < -10 ? 'blue' : 'black';

<p style={{ color: countColor }}>Count: {count}</p>
```

### Challenge 4: Add History Tracking (Hard)

**Goal**: Keep a list of all previous count values

**Hint**: Use an array in state
```javascript
const [history, setHistory] = useState([0]);

const handleIncrement = () => {
  const newCount = count + 1;
  setCount(newCount);
  setHistory([...history, newCount]);
};
```

Display history:
```javascript
<div className="history">
  <h3>History</h3>
  <p>{history.join(' → ')}</p>
</div>
```

---

## Part 6: TypeScript Setup (30 minutes - Optional for Day 1)

### Why TypeScript?

TypeScript adds type safety to JavaScript. Your Android experience makes this natural!

```typescript
// ❌ JavaScript (no type checking)
const add = (a, b) => a + b;
add("5", 3);  // Returns "53" (string concatenation!) - BUG!

// ✅ TypeScript (catches errors)
const add = (a: number, b: number): number => a + b;
add("5", 3);  // ❌ ERROR! "5" is not a number
```

### Create a TypeScript Version

If you want to add TypeScript, create a new project:

```bash
npx create-react-app day1-react-app-ts --template typescript
```

Or you can add it to your existing project (we'll do this properly later).

For now, let's stick with JavaScript and focus on React concepts.

---

## Part 7: Commit Your Code to GitHub (30 minutes)

### Step 1: Initialize Git

```bash
cd day1-react-app
git init
git add .
git commit -m "Day 1: First React counter app"
```

### Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a repository named `react-typescript-course`
3. Don't initialize with README (we already have one)

### Step 3: Push Your Code

```bash
git remote add origin https://github.com/YOUR-USERNAME/react-typescript-course.git
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

Visit your GitHub repo and verify your code is there! ✅

**Your GitHub URL**: `https://github.com/YOUR-USERNAME/react-typescript-course`

---

## Part 8: Quiz - Test Your Understanding 📝

Answer these questions to assess your learning:

### Question 1: What's the difference between `const` and `let`?
A) `const` can't be reassigned, `let` can  
B) `const` is for constants, `let` is for variables  
C) They're the same thing  
D) A and B  

**Answer**: D (both are correct ways to think about it)

---

### Question 2: What does JSX compile to?
A) HTML  
B) `React.createElement()` calls  
C) Plain JavaScript objects  
D) Both B and C  

**Answer**: D

---

### Question 3: What's wrong with this code?
```javascript
const Greeting = () => {
  return (
    <h1>Hello</h1>
    <p>Welcome</p>
  );
};
```

A) Nothing, it's correct  
B) JSX requires a single root element  
C) Missing return statement  
D) Wrong syntax for component  

**Answer**: B (Need to wrap in `<>` or `<div>`)

---

### Question 4: What does `useState` return?
A) Just the current state value  
B) An array with [currentValue, updateFunction]  
C) An object with state and setState  
D) A Promise  

**Answer**: B

---

### Question 5: How do you handle a button click in React?
A) `onclick="handleClick()"`  
B) `onClick={handleClick}`  
C) `on:click={handleClick}`  
D) `click={() => handleClick()}`  

**Answer**: B (use camelCase, pass function, don't call it)

---

### Question 6: What will this log?
```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4];
console.log(arr);
```

A) [1, 2, 3, 4]  
B) [1, 2, 3]  
C) undefined  
D) Error  

**Answer**: B (spread operator creates a new array, doesn't modify original)

---

### Question 7: How would you pass data to a component?
A) Global variables  
B) Props  
C) localStorage  
D) useState  

**Answer**: B (Props are the correct way)

---

### Question 8: What does this component do?
```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  return <p>{count}</p>;
};
```

A) Creates a counter that displays 0  
B) Creates a counter that never changes  
C) Creates an error  
D) A and B  

**Answer**: A (it displays 0, but can be updated with `setCount`)

---

## Scoring Guide:
- **7-8 correct**: ✅ Excellent! You understand Day 1 concepts
- **5-6 correct**: ✅ Good! Review any you missed
- **3-4 correct**: ⚠️ Review the key concepts
- **0-2 correct**: 📚 Review the material and try again

---

## Day 1 Summary

### What You Learned:
✅ ES6+ JavaScript fundamentals  
✅ React components and JSX  
✅ Props for passing data  
✅ useState hook for managing state  
✅ Event handling in React  
✅ Project setup with create-react-app  
✅ Git and GitHub basics  

### What You Built:
✅ Your first React app  
✅ An interactive counter  
✅ Committed to GitHub  

### Key Takeaways:
1. React is about building reusable components
2. JSX is just JavaScript with HTML syntax
3. Props flow data down, events flow up
4. useState manages component state
5. Always use `const` and `let`, never `var`
6. Use arrow functions `() => {}`
7. Destructure when you can

---

## Your Next Steps:

### Tonight/Tomorrow:
1. ✅ Complete all 4 challenges
2. ✅ Review the quiz (aim for 7-8/8)
3. ✅ Make sure your code is on GitHub
4. ✅ Deploy your app to Vercel (optional, but good practice)

### Deploy to Vercel (5 minutes):
```bash
npm install -g vercel
vercel
# Follow prompts
```

This gives you a live URL to share!

### Tomorrow (Day 2):
We'll learn TypeScript basics and improve your React app with proper typing.

---

## Resources for Day 1:

- **React Official Docs**: https://react.dev
- **MDN JavaScript Guide**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **ES6+ Cheatsheet**: https://github.com/DrkSephy/es6-cheatsheet
- **Create React App Docs**: https://create-react-app.dev/

---

## Your Challenge Checklist:

- [ ] Set up your first React app
- [ ] Create the counter component
- [ ] Complete Challenge 1 (Reset button)
- [ ] Complete Challenge 2 (Step increment)
- [ ] Complete Challenge 3 (Styling)
- [ ] Complete Challenge 4 (History)
- [ ] Take the quiz (aim for 7-8)
- [ ] Commit to GitHub
- [ ] Deploy to Vercel (optional)

---

**Congratulations on Day 1! 🎉**

You've officially started your React journey!

How many of the challenges did you complete?
Which ones gave you trouble?
Are you ready for Day 2?
