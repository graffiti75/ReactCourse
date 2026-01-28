// ========================================
// DAY 2: TYPESCRIPT ESSENTIALS FOR REACT
// Complete Code Examples & Solutions
// ========================================

// ===============================
// FILE 1: src/App.tsx (Main Typed Component)
// ===============================

import { useState } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import './App.css';

// Define app state interface
interface AppState {
  count: number;
  step: number;
  history: number[];
}

function App(): JSX.Element {
  // State with explicit types
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);

  // Event handlers with TypeScript types
  const handleIncrement = (): void => {
    const newCount: number = count + step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleDecrement = (): void => {
    const newCount: number = count - step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleReset = (): void => {
    setCount(0);
    setHistory([0]);
  };

  const handleStepChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newStep: number = Number(event.target.value);
    setStep(newStep);
  };

  // Conditional styling with type
  const countColor: string = 
    count > 10 ? 'red' : 
    count < -10 ? 'blue' : 
    'black';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React! 🚀</h1>
        <p>Day 2: Building your first TypeScript React app</p>
      </header>

      <main className="counter-section">
        <div className="counter">
          <p 
            style={{ color: countColor }} 
            className="count-display"
          >
            Count: {count}
          </p>

          <div className="button-group">
            <button onClick={handleIncrement}>
              Increment
            </button>
            <button onClick={handleDecrement}>
              Decrement
            </button>
            <button onClick={handleReset}>
              Reset
            </button>
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
        </div>

        {/* Display History if we have more than 1 entry */}
        {history.length > 1 && (
          <div className="history">
            <h3>History</h3>
            <p className="history-display">
              {history.join(' → ')}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// ===============================
// TYPESCRIPT BASICS EXAMPLES
// ===============================

// 1. BASIC TYPES
const name: string = "Rodrigo";
const age: number = 30;
const isActive: boolean = true;
const anything: any = "can be anything";

// 2. ARRAYS
const names: string[] = ["Alice", "Bob", "Charlie"];
const scores: number[] = [90, 85, 92];
const mixed: (string | number)[] = ["Alice", 123, "Bob"];

// 3. INTERFACES (Object shape definitions)
interface User {
  name: string;
  age: number;
  email: string;
}

interface UserWithOptional {
  name: string;
  age: number;
  email?: string;  // Optional property
}

interface CounterProps {
  initialValue?: number;
  onIncrement: () => void;
}

// 4. UNIONS (Multiple possible types)
type Status = 'loading' | 'success' | 'error';
const status: Status = 'loading';  // Only these 3 values allowed

// 5. FUNCTION TYPES
const add = (a: number, b: number): number => {
  return a + b;
};

const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

const log = (message: string): void => {
  console.log(message);  // Returns nothing
};

// 6. FUNCTION WITH INTERFACE
const createUser = (data: User): User => {
  return data;
};

// ===============================
// CHALLENGE 1: TYPED BUTTON COMPONENT
// ===============================

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ 
  label, 
  onClick, 
  disabled = false,
  variant = 'primary'
}: ButtonProps): JSX.Element => {
  const getButtonClass = (): string => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={getButtonClass()}
    >
      {label}
    </button>
  );
};

// Usage:
// <Button label="Click Me" onClick={() => console.log("clicked")} />
// <Button label="Delete" onClick={() => {}} variant="danger" />
// <Button label="Disabled" onClick={() => {}} disabled={true} />

// ===============================
// CHALLENGE 2: CUSTOM HOOK WITH TYPES
// ===============================

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => {
    setCount(count + 1);
  };

  const decrement = (): void => {
    setCount(count - 1);
  };

  const reset = (): void => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
};

// Usage:
// const { count, increment, decrement, reset } = useCounter(0);

// ===============================
// CHALLENGE 3: TYPED COMPONENT WITH PROPS
// ===============================

interface CounterDisplayProps {
  count: number;
  color: string;
  label?: string;
}

const CounterDisplay = ({ 
  count, 
  color,
  label = 'Count'
}: CounterDisplayProps): JSX.Element => {
  return (
    <p style={{ color, fontSize: '32px', fontWeight: 'bold' }}>
      {label}: {count}
    </p>
  );
};

// Usage:
// <CounterDisplay count={5} color="blue" />
// <CounterDisplay count={-15} color="red" label="Score" />

// ===============================
// CHALLENGE 4: COMPLEX INTERFACE
// ===============================

interface HistoryItem {
  value: number;
  timestamp: Date;
  operation: 'increment' | 'decrement' | 'reset';
}

interface ComplexAppState {
  count: number;
  step: number;
  history: HistoryItem[];
  isLoading: boolean;
  error: string | null;
}

// Using complex state
const useComplexCounter = (): [ComplexAppState, (state: ComplexAppState) => void] => {
  const [state, setState] = useState<ComplexAppState>({
    count: 0,
    step: 1,
    history: [],
    isLoading: false,
    error: null
  });

  return [state, setState];
};

// ===============================
// TYPING EVENTS
// ===============================

// Button click
const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
  console.log("Button clicked");
};

// Input change
const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
  const value: string = event.target.value;
  console.log(value);
};

// Form submit
const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  console.log("Form submitted");
};

// Focus event
const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
  console.log("Input focused");
};

// ===============================
// GENERICS (Advanced)
// ===============================

// Generic function (works with any type)
const makeArray = <T,>(item: T): T[] => {
  return [item];
};

// Usage:
// const stringArray = makeArray<string>("hello");  // ["hello"]
// const numberArray = makeArray<number>(42);       // [42]

// Generic interface
interface Container<T> {
  value: T;
  getValue: () => T;
  setValue: (val: T) => void;
}

// ===============================
// UTILITY TYPES
// ===============================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: "Alice" };  // Only need to provide some

// Pick - select specific properties
type UserPreview = Pick<User, 'name' | 'email'>;
const preview: UserPreview = { name: "Alice", email: "alice@example.com" };

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
const newUser: UserWithoutId = { name: "Bob", email: "bob@example.com", age: 25 };

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Readonly - can't modify
type ReadonlyUser = Readonly<User>;
const user: ReadonlyUser = { id: 1, name: "Charlie", email: "charlie@example.com", age: 30 };
// user.name = "David";  // ❌ ERROR: Can't modify readonly

// ===============================
// COMMON PATTERNS
// ===============================

// Pattern 1: Props with children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// Pattern 2: Callback props
interface ListProps<T> {
  items: T[];
  onItemClick: (item: T) => void;
}

const List = <T,>({ items, onItemClick }: ListProps<T>): JSX.Element => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => onItemClick(item)}>
          {String(item)}
        </li>
      ))}
    </ul>
  );
};

// Pattern 3: Status management
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  status: RequestStatus;
  data: T | null;
  error: string | null;
}

// ===============================
// MIGRATION FROM JAVASCRIPT
// ===============================

/*
JavaScript version:
const handleIncrement = () => {
  const newCount = count + step;
  setCount(newCount);
  setHistory([...history, newCount]);
};

TypeScript version:
const handleIncrement = (): void => {
  const newCount: number = count + step;
  setCount(newCount);
  setHistory([...history, newCount]);
};

Changes:
1. (): void => means function returns nothing
2. const newCount: number => specifies newCount is a number
3. Catches errors at compile time instead of runtime!
*/

// ===============================
// ERROR HANDLING WITH TYPES
// ===============================

// Custom error type
interface ApiError {
  code: number;
  message: string;
  details?: string;
}

// Function that returns result or error
const fetchData = async (url: string): Promise<string | ApiError> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error: ApiError = {
        code: response.status,
        message: 'Failed to fetch',
        details: response.statusText
      };
      return error;
    }
    return await response.text();
  } catch (err) {
    const error: ApiError = {
      code: 500,
      message: 'Network error'
    };
    return error;
  }
};

// ===============================
// GIT COMMANDS FOR DAY 2
// ===============================

/*
# Commit your TypeScript work
git add .
git commit -m "Day 2: TypeScript Counter App with full typing"

# Push to GitHub
git push origin main

# Check status
git status
*/

// ===============================
// NEXT STEPS
// ===============================

/*
BEFORE DAY 3:

1. ✅ Create TypeScript React project
2. ✅ Understand basic types (string, number, boolean)
3. ✅ Understand interfaces and object shapes
4. ✅ Type your props correctly
5. ✅ Type your event handlers
6. ✅ Commit to GitHub
7. ✅ Complete all 4 challenges
8. ✅ Score 7-8/8 on quiz

WHAT'S NEXT (Day 3):
- Advanced TypeScript (generics, utility types)
- More complex component patterns
- Type guards and assertions
- Custom hooks with types
- Real-world TypeScript patterns
*/
