// ========================================
// DAY 5: useState HOOK & COMPONENT STATE
// TODO LIST APP WITH STATE MANAGEMENT
// Complete Code Examples & Solutions
// ========================================

// ===============================
// KEY CONCEPTS & HINTS
// ===============================

/*
CONCEPT 1: What is useState?
  useState is a React Hook that lets you add state to functional components.
  
  Syntax:
  const [value, setValue] = useState(initialValue);
        ↑      ↑                ↑
      read   update         starting value

CONCEPT 2: How useState Works
  const [count, setCount] = useState(0);
  
  - count = current value (0)
  - setCount = function to update count
  - useState(0) = initial value
  
  When you call setCount:
  1. State updates
  2. Component re-renders
  3. UI shows new value

CONCEPT 3: State Triggers Re-Render
  const [count, setCount] = useState(0);
  
  setCount(1);  // ← This triggers re-render!
  
  Component automatically updates UI with new value.

CONCEPT 4: Multiple State Variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  Each state variable is independent!

CONCEPT 5: Don't Mutate State Directly
  ❌ WRONG:
  const [count, setCount] = useState(0);
  count = 5;  // Direct mutation - DON'T DO THIS!
  
  ✅ CORRECT:
  setCount(5);  // Use setter function

CONCEPT 6: Immutability with Arrays
  ❌ WRONG:
  const [todos, setTodos] = useState([]);
  todos.push('New todo');  // Mutating array
  
  ✅ CORRECT:
  setTodos([...todos, 'New todo']);  // Create new array
  
  The spread operator (...) creates a new array copy.

CONCEPT 7: Immutability with Objects
  ❌ WRONG:
  const [todo, setTodo] = useState({ text: '', completed: false });
  todo.completed = true;  // Mutating object
  
  ✅ CORRECT:
  setTodo({ ...todo, completed: true });  // Create new object

CONCEPT 8: Conditional Rendering
  {todos.length === 0 ? (
    <p>No todos yet!</p>
  ) : (
    <ul>{todos.map(...)}</ul>
  )}

TECHNIQUE 1: Update State Based on Previous State
  const [count, setCount] = useState(0);
  
  ✅ CORRECT:
  setCount(count + 1);
  
  But if you need to be sure about previous state:
  setCount(prevCount => prevCount + 1);

TECHNIQUE 2: Array Filter (Remove Items)
  const [todos, setTodos] = useState([...]);
  
  Remove todo with id=2:
  setTodos(todos.filter(todo => todo.id !== 2));
  
  Filter creates NEW array without matching items.

TECHNIQUE 3: Array Map (Update Items)
  Update todo with id=2:
  setTodos(
    todos.map(todo => 
      todo.id === 2 ? { ...todo, completed: true } : todo
    )
  );
  
  Map creates NEW array with updated items.

TECHNIQUE 4: Callback Props
  Parent component has state, passes update function to child.
  
  Parent:
  const [todos, setTodos] = useState([]);
  const handleAdd = (text) => setTodos([...todos, text]);
  <TodoInput onAdd={handleAdd} />
  
  Child:
  <button onClick={() => onAdd('new todo')}>Add</button>
*/

// ===============================
// FILE 1: src/components/TodoList.tsx
// Main Component with State
// ===============================

import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './TodoList.css';

// Define Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  // State: Array of todos
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // State: Counter for unique IDs
  const [nextId, setNextId] = useState<number>(1);

  // Handler: Add a new todo
  const handleAddTodo = (text: string): void => {
    const newTodo: Todo = {
      id: nextId,
      text: text,
      completed: false
    };
    // Spread operator creates NEW array
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  // Handler: Toggle completed status
  const handleToggleTodo = (id: number): void => {
    // Map creates NEW array with updated todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler: Delete a todo
  const handleDeleteTodo = (id: number): void => {
    // Filter creates NEW array without deleted todo
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Calculate completed count
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-list-container">
      <h1>My Todo List</h1>
      
      {/* Pass callback to child */}
      <TodoInput onAddTodo={handleAddTodo} />

      {/* Display stats */}
      <div className="todo-stats">
        <p>Total: {todos.length} | Done: {completedCount}</p>
      </div>

      {/* Display todos */}
      <div className="todo-items">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet! Add one to get started.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;

// ===============================
// FILE 2: src/components/TodoInput.tsx
// Component with Local State
// ===============================

import { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  // Local state: input field value
  const [inputValue, setInputValue] = useState<string>('');

  // Handler: Add todo and clear input
  const handleAddTodo = (): void => {
    if (inputValue.trim() !== '') {
      onAddTodo(inputValue);
      setInputValue('');  // Clear input after adding
    }
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoInput;

// ===============================
// FILE 3: src/components/TodoItem.tsx
// Display Single Todo
// ===============================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;

// ===============================
// FILE 4: src/App.tsx
// Main App Component
// ===============================

import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

// ===============================
// COMMON PATTERNS
// ===============================

// Pattern 1: Update number state
const [count, setCount] = useState(0);
setCount(count + 1);  // Increment
setCount(count - 1);  // Decrement

// Pattern 2: Update string state
const [name, setName] = useState('');
setName('John');  // Set directly

// Pattern 3: Toggle boolean state
const [isVisible, setIsVisible] = useState(true);
setIsVisible(!isVisible);  // Toggle

// Pattern 4: Add to array
const [todos, setTodos] = useState<string[]>([]);
setTodos([...todos, 'New todo']);  // Add item

// Pattern 5: Remove from array by ID
setTodos(todos.filter(todo => todo.id !== targetId));

// Pattern 6: Update item in array
setTodos(
  todos.map(todo =>
    todo.id === targetId ? { ...todo, completed: true } : todo
  )
);

// Pattern 7: Clear array
setTodos([]);

// Pattern 8: Update object property
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser({ ...user, age: 31 });

// ===============================
// STATE FLOW IN TODO APP
// ===============================

/*
Component Hierarchy:
App
└── TodoList (has todos state)
    ├── TodoInput (calls onAddTodo callback)
    └── TodoItem (calls onToggle, onDelete callbacks)

Data Flow:
1. TodoList has: [{ id: 1, text: 'Buy milk', completed: false }]
2. TodoList passes to TodoInput: onAddTodo={(text) => handleAddTodo(text)}
3. User types "Learn React" and clicks Add
4. TodoInput calls: onAddTodo("Learn React")
5. TodoList's handleAddTodo runs
6. setTodos called with new array
7. TodoList re-renders with new todo
8. TodoItem receives updated todos via map()
9. UI shows new todo in list

Event Flow (Toggling):
1. User clicks checkbox in TodoItem
2. onChange handler calls: onToggle(todo.id)
3. TodoItem passes to TodoList: onToggle={handleToggleTodo}
4. TodoList's handleToggleTodo runs with id=1
5. setTodos updates todo with map()
6. Component re-renders
7. UI shows updated checkbox state
*/

// ===============================
// TESTING CHECKLIST
// ===============================

/*
Test your Todo app:

1. Add Todo
   [ ] Type "Buy milk" and click Add
   [ ] Todo appears in list
   [ ] Input field clears
   [ ] Total count increases

2. Toggle Completion
   [ ] Click checkbox on todo
   [ ] Text gets strikethrough
   [ ] Done count increases
   [ ] Click again to uncheck

3. Delete Todo
   [ ] Click Delete button
   [ ] Todo disappears
   [ ] Total count decreases

4. Empty State
   [ ] Delete all todos
   [ ] See "No todos yet!" message
   [ ] Count shows 0

5. Multiple Operations
   [ ] Add 3 todos
   [ ] Check 2 as complete
   [ ] Delete 1
   [ ] Total=2, Done=2, verify correct count

6. Edge Cases
   [ ] Type empty space and click Add (should not add)
   [ ] Press Enter in input (should add)
   [ ] Check box multiple times (should toggle)
   [ ] Click Delete on completed todo (should delete)

7. Responsive
   [ ] Test on mobile (should be readable)
   [ ] Input field should be accessible
*/

// ===============================
// GIT COMMANDS FOR DAY 5
// ===============================

/*
# Create Day 5 folder
mkdir Day5-TodoList
cd Day5-TodoList

# Create project
npx create-react-app . --template typescript

# Create components
mkdir src/components
touch src/components/TodoList.tsx
touch src/components/TodoInput.tsx
touch src/components/TodoItem.tsx
touch src/components/TodoList.css

# Build and test
npm start

# Commit
git add .
git commit -m "Day 5: Todo List App with useState Hook"
git push origin main
*/
