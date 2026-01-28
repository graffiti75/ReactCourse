# Day 2: TypeScript Essentials for React

**Duration**: 3-5 hours  
**Skill Level**: Beginner to Intermediate  
**Goal**: Learn TypeScript and convert your Day 1 app to use types  
**Outcome**: A type-safe React counter app

---

## Part 1: What is TypeScript?

### Quick Definition

**TypeScript = JavaScript + Type Safety**

It's JavaScript with the ability to declare what type of data a variable should contain.

```javascript
// JavaScript (no types)
const add = (a, b) => a + b;
add(5, 3);      // Works: 8
add("5", 3);    // Works but WRONG: "53" (string concatenation!)

// TypeScript (with types)
const add = (a: number, b: number): number => a + b;
add(5, 3);      // Works: 8 ✅
add("5", 3);    // ERROR! ❌ "5" is not a number
```

### Why TypeScript?

✅ **Catch errors early** - Before running your code  
✅ **Better autocomplete** - Your IDE knows what properties exist  
✅ **Self-documenting** - Code explains what types it expects  
✅ **Refactoring safety** - Change code without breaking things  
✅ **Job market** - 85% of React jobs want TypeScript  

### Android Parallel

Think of TypeScript like **type safety in Kotlin**:

```kotlin
// Kotlin (type-safe like TypeScript)
fun add(a: Int, b: Int): Int = a + b

// Java (more flexible like JavaScript)
public int add(Object a, Object b) { ... }
```

---

## Part 2: TypeScript Basics

### 2.1 Basic Types

```typescript
// String
const name: string = "Rodrigo";
const name: string = 123;  // ❌ ERROR

// Number
const age: number = 30;
const age: number = "30";  // ❌ ERROR

// Boolean
const isActive: boolean = true;
const isActive: boolean = 1;  // ❌ ERROR (not true/false)

// Any (avoid if possible!)
const anything: any = "can be anything";
anything = 123;  // ✅ Allowed but loses type safety!

// Union (can be multiple types)
const id: string | number = "user-123";
const id: string | number = 456;  // ✅ Both work
```

### 2.2 Arrays

```typescript
// Array of strings
const names: string[] = ["Alice", "Bob", "Charlie"];
const names: string[] = ["Alice", 123];  // ❌ ERROR

// Array of numbers
const scores: number[] = [90, 85, 92];
const scores: number[] = [90, "85"];  // ❌ ERROR

// Array of multiple types
const mixed: (string | number)[] = ["Alice", 123, "Bob"];

// Alternative syntax
const names: Array<string> = ["Alice", "Bob"];
```

### 2.3 Interfaces (Defining Object Shapes)

**Interfaces describe the structure of an object.**

```typescript
// Define what a User looks like
interface User {
  name: string;
  age: number;
  email: string;
}

// Use the interface
const user: User = {
  name: "Rodrigo",
  age: 30,
  email: "rodrigo@example.com"
};

// Missing property - ERROR!
const user: User = {
  name: "Rodrigo",
  age: 30
  // Missing email! ❌ ERROR
};
```

### 2.4 Optional Properties

```typescript
interface User {
  name: string;
  age: number;
  email?: string;  // Optional (might not exist)
}

const user1: User = {
  name: "Rodrigo",
  age: 30,
  email: "rodrigo@example.com"
};

const user2: User = {
  name: "Alice",
  age: 25
  // No email needed ✅
};
```

### 2.5 Functions with Types

```typescript
// Typed parameters and return value
const add = (a: number, b: number): number => {
  return a + b;
};

add(5, 3);      // ✅ 8
add("5", "3");  // ❌ ERROR

// Function with interface
interface GreetProps {
  name: string;
  age: number;
}

const greet = (props: GreetProps): string => {
  return `Hello ${props.name}, you are ${props.age}`;
};

greet({ name: "Rodrigo", age: 30 });  // ✅
greet({ name: "Rodrigo" });           // ❌ Missing age
```

---

## Part 3: TypeScript in React

### 3.1 Typing Props

```typescript
// Define what props your component accepts
interface GreetingProps {
  name: string;
  age: number;
  city?: string;  // Optional
}

// Use the interface in your component
const Greeting = ({ name, age, city }: GreetingProps) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      {city && <p>City: {city}</p>}
    </div>
  );
};

// Usage
<Greeting name="Rodrigo" age={30} city="Curitiba" />  // ✅
<Greeting name="Rodrigo" />                            // ❌ Missing age
```

### 3.2 Typing useState

```typescript
// Explicit type (recommended for clarity)
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("Rodrigo");
const [isActive, setIsActive] = useState<boolean>(true);

// Type inference (TypeScript guesses)
const [count, setCount] = useState(0);  // Infers: number
const [name, setName] = useState("");   // Infers: string

// Array type
const [history, setHistory] = useState<number[]>([0]);
```

### 3.3 Event Handlers with Types

```typescript
import { ChangeEvent, MouseEvent } from "react";

// Button click
const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked");
};

// Input change
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  setCount(Number(value));
};

// Usage
<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} type="number" />
```

---

## Part 4: Setting Up TypeScript React

### Option 1: Create New TypeScript Project

```bash
npx create-react-app day2-react-app --template typescript
cd day2-react-app
npm start
```

This creates a React project with TypeScript pre-configured.

### Option 2: Add TypeScript to Existing Project

If you want to add TypeScript to your Day 1 project:

```bash
# Navigate to your project
cd day1-react-app

# Create tsconfig.json and other TypeScript files
npm install --save typescript @types/react @types/react-dom

# Rename files from .js to .tsx
mv src/App.js src/App.tsx
mv src/index.js src/index.tsx
```

Then VS Code will help you fix any TypeScript errors!

---

## Part 5: Converting Your Day 1 App to TypeScript

### Step 1: Create New TypeScript Project

```bash
npx create-react-app day2-counter-app --template typescript
cd day2-counter-app
```

### Step 2: Typed App.tsx

Replace `src/App.tsx` with:

```typescript
import { useState } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import './App.css';

function App(): JSX.Element {
  // State with types
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);

  // Event handlers with types
  const handleIncrement = (): void => {
    const newCount = count + step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleDecrement = (): void => {
    const newCount = count - step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleReset = (): void => {
    setCount(0);
    setHistory([0]);
  };

  const handleStepChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setStep(Number(event.target.value));
  };

  // Conditional styling
  const countColor: string = count > 10 ? 'red' : count < -10 ? 'blue' : 'black';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React! 🚀</h1>
        <p>Day 2: TypeScript Counter App</p>
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
            onChange={handleStepChange}
          />
        </div>

        {history.length > 1 && (
          <div className="history">
            <h3>History</h3>
            <p className="history-display">{history.join(' → ')}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

### Step 3: Copy CSS

Copy your `App.css` from Day 1 to `src/App.css` (same styling!)

### Step 4: Run It

```bash
npm start
```

Your app now runs with **full type safety!** ✅

---

## Part 6: Hands-On Challenges

### Challenge 1: Create a Typed Component (Easy)

Create a `Button` component with typed props:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Usage
<Button label="Click Me" onClick={() => console.log("clicked")} />
<Button label="Disabled" onClick={() => {}} disabled={true} />
```

---

### Challenge 2: Create a Typed Hook (Medium)

Create a custom hook with types:

```typescript
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);
  const reset = (): void => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// Usage
const { count, increment, decrement, reset } = useCounter(0);
```

---

### Challenge 3: Type a Component with Props (Medium)

```typescript
interface CounterDisplayProps {
  count: number;
  color: string;
}

const CounterDisplay = ({ count, color }: CounterDisplayProps) => {
  return (
    <p style={{ color }}>
      Count: {count}
    </p>
  );
};

// Usage
<CounterDisplay count={5} color="blue" />
```

---

### Challenge 4: Create a Complex Interface (Hard)

```typescript
interface AppState {
  count: number;
  step: number;
  history: number[];
  isLoading: boolean;
}

// Use it in your app
const [state, setState] = useState<AppState>({
  count: 0,
  step: 1,
  history: [0],
  isLoading: false
});
```

---

## Part 7: TypeScript vs JavaScript Comparison

### Your Counter App

**JavaScript (Day 1)**:
```javascript
const handleIncrement = () => {
  const newCount = count + step;
  setCount(newCount);
  setHistory([...history, newCount]);
};
```

**TypeScript (Day 2)**:
```typescript
const handleIncrement = (): void => {
  const newCount: number = count + step;
  setCount(newCount);
  setHistory([...history, newCount]);
};
```

**Difference**:
- `: void` = Function returns nothing
- `: number` = newCount is a number
- Catch bugs at **compile time**, not **runtime**!

---

## Part 8: Common TypeScript Errors & Fixes

### Error 1: Type Mismatch

```typescript
const count: number = "5";  // ❌ ERROR: "5" is string, not number
```

**Fix**:
```typescript
const count: number = 5;  // ✅ Correct
```

---

### Error 2: Missing Property

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Rodrigo"
  // ❌ ERROR: Missing 'age'
};
```

**Fix**:
```typescript
const user: User = {
  name: "Rodrigo",
  age: 30  // ✅ Added
};
```

---

### Error 3: Event Type

```typescript
const handleClick = (e) => {  // ❌ What type is 'e'?
  console.log(e);
};
```

**Fix**:
```typescript
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log(e);  // ✅ TypeScript knows 'e' is a button click
};
```

---

### Error 4: Array Type

```typescript
const numbers: number[] = [1, 2, "3"];  // ❌ "3" is string!
```

**Fix**:
```typescript
const numbers: number[] = [1, 2, 3];  // ✅ All numbers
```

---

## Part 9: Quiz - Test Your Understanding 📝

### Question 1: What is TypeScript?
A) A programming language  
B) JavaScript with type safety  
C) A framework  
D) A database  

**Answer**: B

---

### Question 2: What does this type mean?
```typescript
const name: string = "Rodrigo";
```

A) name can be any value  
B) name must be a string  
C) name is optional  
D) name is a function  

**Answer**: B

---

### Question 3: How do you type an array of numbers?
A) `const arr: array = [1, 2, 3];`  
B) `const arr: number[] = [1, 2, 3];`  
C) `const arr: [number] = [1, 2, 3];`  
D) `const arr = [1, 2, 3];`  

**Answer**: B

---

### Question 4: What's an interface?
A) A design pattern  
B) A user interface  
C) A definition of object shape  
D) A React component  

**Answer**: C

---

### Question 5: What does `: void` mean?
A) Function returns nothing  
B) Function parameter is empty  
C) Function is useless  
D) Function has no types  

**Answer**: A

---

### Question 6: What's wrong with this code?
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice" };
```

A) name is wrong type  
B) Missing age property  
C) Interface is wrong  
D) Nothing, it's correct  

**Answer**: B (Missing age property)

---

### Question 7: How do you make a property optional?
A) `name: string | undefined`  
B) `name?: string;`  
C) `name = string;`  
D) Both A and B  

**Answer**: D (Both work)

---

### Question 8: Which file extension is TypeScript React?
A) `.ts`  
B) `.jsx`  
C) `.tsx`  
D) `.typescript`  

**Answer**: C (`.tsx` = TypeScript + JSX)

---

## Scoring Guide:
- **7-8 correct**: ✅ Excellent! Ready for advanced topics
- **5-6 correct**: ✅ Good! Review any you missed
- **3-4 correct**: ⚠️ Review the key concepts
- **0-2 correct**: 📚 Review the material and try again

---

## Part 10: TypeScript Setup Checklist

Before you run your app:

- [ ] Node.js and npm installed
- [ ] Created new TypeScript project: `npx create-react-app day2-counter-app --template typescript`
- [ ] Navigated to project: `cd day2-counter-app`
- [ ] Replaced src/App.tsx with typed code
- [ ] Copied App.css from Day 1
- [ ] npm start works without errors

---

## Day 2 Summary

### What You Learned:
✅ What TypeScript is (JavaScript + types)  
✅ Basic types (string, number, boolean)  
✅ Interfaces (object shapes)  
✅ Arrays and unions  
✅ Function types  
✅ React component props typing  
✅ useState with types  
✅ Event handler types  

### What You Built:
✅ Typed counter app (same as Day 1, but type-safe!)  
✅ Understood IDE autocomplete  
✅ Caught errors before runtime  

### Key Takeaways:
1. TypeScript = JavaScript + type safety
2. Interfaces describe object shapes
3. Always type your props and state
4. Use `: type` syntax to declare types
5. Events have specific types (`MouseEvent`, `ChangeEvent`)
6. `.tsx` = TypeScript React files

---

## Your Challenge Checklist:

- [ ] Create TypeScript React project
- [ ] Copy and understand the typed App.tsx code
- [ ] Copy App.css from Day 1
- [ ] Run npm start (no errors!)
- [ ] Complete Challenge 1 (Typed Button component)
- [ ] Complete Challenge 2 (Custom hook)
- [ ] Complete Challenge 3 (Typed component with props)
- [ ] Complete Challenge 4 (Complex interface)
- [ ] Take the quiz (aim for 7-8/8)
- [ ] Commit to GitHub with: `git commit -m "Day 2: TypeScript Counter App"`

---

## What's Next (Day 3)?

**Day 3: Advanced TypeScript & Generics**

We'll learn:
- Generics (reusable types)
- Advanced types (readonly, Pick, Omit)
- Type guards
- More complex component patterns

---

**Congratulations on Day 2! 🎉**

You're now writing type-safe React code!

**How confident are you about TypeScript (1-10)?**
**Did you complete all the challenges?**
**Ready for Day 3?**

Let me know when you're done! 🚀
