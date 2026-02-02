# Day 5: useState Hook & Component State

**Duration**: 5-7 hours  
**Skill Level**: Beginner  
**Goal**: Learn state management and build a basic Todo List app  
**Outcome**: A fully functional todo app where users can add, delete, and manage todos

---

## Part 1: What You're Building & Why It Matters

### What is State?

**State** is data that can CHANGE over time in your component.

Unlike **props** (which come from parent and are read-only), **state** is:
- **Mutable** - Can be changed
- **Component's own data** - Belongs to the component
- **Triggers re-render** - When state changes, component updates automatically

### Real-World Example

Imagine a light switch:
- **Props** = Instructions "This is a light switch"
- **State** = Is it ON or OFF? (changes based on user interaction)

### What You'll Build Today

A **Basic Todo List App** with:
- ✅ Add new todos
- ✅ Display list of todos
- ✅ Mark todos as complete
- ✅ Delete todos
- ✅ Show todo count

### Visual Example

```
┌─────────────────────────────┐
│ My Todo List                │
├─────────────────────────────┤
│ [✓] Buy groceries          │
│ [ ] Learn React            │
│ [✓] Walk the dog           │
├─────────────────────────────┤
│ Add Todo: [____________] [+]│
├─────────────────────────────┤
│ Total: 3 | Done: 2         │
└─────────────────────────────┘
```

### Why This Matters

- **State is fundamental** to React
- **Every interactive app** needs state
- **useState is the most common hook** you'll use
- **Understanding state** unlocks powerful React applications

---

## Part 2: Understanding useState Hook

### What is a Hook?

A **Hook** is a special React function that lets you "hook into" React features.

`useState` is a Hook that lets you add state to functional components.

### The Basics

```typescript
import { useState } from 'react';

// Step 1: Import useState
// Step 2: Create state variable
const [count, setCount] = useState(0);
//     ↑       ↑                ↑
//   current  function to   initial
//   value    update it      value
```

### Breaking Down useState

```typescript
const [count, setCount] = useState(0);
```

**What this means:**
- `count` = Current state value (starts at 0)
- `setCount` = Function to update the state
- `useState(0)` = Initial value is 0

### How to Use State

```typescript
// Read the state
console.log(count);  // 0

// Update the state
setCount(1);  // count is now 1 (component re-renders)
setCount(count + 1);  // count is now 2
```

### State Triggers Re-Render

**CRITICAL**: When you call a setter function, React re-renders the component!

```typescript
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);  // Triggers re-render!
};

return (
  <div>
    <p>Count: {count}</p>
    <button onClick={handleClick}>Increment</button>
  </div>
);

// User clicks button:
// 1. handleClick() runs
// 2. setCount(1) called
// 3. Component re-renders
// 4. count is now 1
// 5. Display shows "Count: 1"
```

### Multiple State Variables

You can have as many state variables as you need:

```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [age, setAge] = useState(0);

// Each has its own state and setter
```

### State Can Be Any Type

```typescript
// String
const [name, setName] = useState('John');

// Number
const [count, setCount] = useState(0);

// Boolean
const [isVisible, setIsVisible] = useState(true);

// Array
const [todos, setTodos] = useState([]);

// Object
const [user, setUser] = useState({ name: 'John', age: 30 });
```

### Important Rule: Don't Mutate State Directly

```typescript
// ❌ WRONG - Don't modify state directly
const [count, setCount] = useState(0);
count = count + 1;  // ERROR! Direct mutation

// ✅ CORRECT - Use setter function
setCount(count + 1);
```

### Important Rule: Immutability

When updating arrays or objects, create a NEW one:

```typescript
// Array state
const [todos, setTodos] = useState(['Buy milk', 'Learn React']);

// ❌ WRONG - Modifying existing array
todos.push('Walk dog');

// ✅ CORRECT - Creating new array
setTodos([...todos, 'Walk dog']);  // Spread operator

// ✅ ALSO CORRECT
setTodos(todos.concat('Walk dog'));
```

---

## Part 3: Step-by-Step Building Process

### Step 1: Create Project & Files

```bash
npx create-react-app day5-todo-list --template typescript
cd day5-todo-list
mkdir src/components
```

Create files:
- `src/components/TodoList.tsx`
- `src/components/TodoList.css`
- `src/components/TodoInput.tsx`
- `src/components/TodoItem.tsx`

### Step 2: Create Todo Type Interface

Create a TypeScript interface for todos:

```typescript
// In TodoList.tsx or a separate types.ts file
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

### Step 3: Build TodoInput Component

This component handles adding new todos:

```typescript
interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

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
```

### Step 4: Build TodoItem Component

This component displays a single todo:

```typescript
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
```

### Step 5: Build Main TodoList Component

This is the main component with state:

```typescript
import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './TodoList.css';

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

  // Add a new todo
  const handleAddTodo = (text: string): void => {
    const newTodo: Todo = {
      id: nextId,
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  // Toggle completed status
  const handleToggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const handleDeleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Count completed todos
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-list-container">
      <h1>My Todo List</h1>
      
      <TodoInput onAddTodo={handleAddTodo} />

      <div className="todo-stats">
        <p>Total: {todos.length} | Done: {completedCount}</p>
      </div>

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
```

### Step 6: Add Styling

Create `src/components/TodoList.css`:

```css
.todo-list-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.todo-list-container h1 {
  color: white;
  margin: 0 0 20px 0;
  text-align: center;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
}

.todo-input input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.todo-input button {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.todo-input button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.todo-stats {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}

.todo-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-message {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 20px;
  font-style: italic;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.todo-item.completed {
  opacity: 0.7;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #ffd700;
}

.todo-text {
  flex: 1;
  color: white;
  font-size: 16px;
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: rgba(255, 255, 255, 0.6);
}

.delete-button {
  padding: 6px 12px;
  background: rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background: rgba(220, 53, 69, 0.5);
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .todo-list-container {
    margin: 20px;
    padding: 20px;
  }

  .todo-input {
    flex-direction: column;
  }

  .todo-input button {
    width: 100%;
  }
}
```

### Step 7: Use TodoList in App.tsx

```typescript
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
```

### Step 8: Test It

```bash
npm start
```

Your app should:
- ✅ Display todo input field
- ✅ Add todos when you type and click Add (or press Enter)
- ✅ Show list of todos
- ✅ Check/uncheck todos
- ✅ Delete todos
- ✅ Show count of total and completed todos

---

## Part 4: Troubleshooting Guide

### Problem: Todo doesn't appear after adding
**Check**:
- ✅ Did you call `setTodos([...todos, newTodo])`?
- ✅ Is `handleAddTodo` connected to the button?
- ✅ Did you pass the callback from parent to child?

### Problem: Checkbox doesn't work
**Check**:
- ✅ Did you add `onChange` handler to checkbox?
- ✅ Does `handleToggleTodo` update state correctly?
- ✅ Is `completed` prop being used?

### Problem: Delete button doesn't delete
**Check**:
- ✅ Did you add `onClick={handleDeleteTodo}`?
- ✅ Are you using `.filter()` to remove the todo?
- ✅ Is the todo ID correct?

### Problem: Completed todos styling doesn't show
**Check**:
- ✅ Did you add `className={todo.completed ? 'completed' : ''}`?
- ✅ Is the CSS `.todo-item.completed` defined?
- ✅ Check browser DevTools to see if class is applied

### Problem: Input doesn't clear after adding
**Check**:
- ✅ Did you call `setInputValue('')` after adding?
- ✅ Is input `value={inputValue}` connected?

---

## Part 5: Key Concepts Summary

| Concept | What It Does | Example |
|---------|-------------|---------|
| `useState` | Add state to component | `const [count, setCount] = useState(0)` |
| State variable | Current value | `count` (reads the value) |
| Setter function | Update state | `setCount(1)` (updates and re-renders) |
| Re-render | Component updates UI | Happens when state changes |
| Immutability | Don't modify state directly | `setTodos([...todos, newTodo])` |
| Array spread | Create new array | `[...todos, newItem]` |
| Object spread | Create new object | `{ ...todo, completed: true }` |

---

## Part 6: Quiz - Test Your Understanding 📝

### Question 1: What does `useState` return?

A) A single value  
B) An array with [current value, setter function]  
C) A function  
D) An object with properties  

**Answer**: B

---

### Question 2: When does a component re-render?

A) When props change  
B) When state changes  
C) Both when props and state change  
D) Never  

**Answer**: C

---

### Question 3: Which is correct?

A) `state = newValue`  
B) `setState(state + 1)`  
C) `state.push(item)`  
D) `state[0] = newValue`  

**Answer**: B

---

### Question 4: How do you add an item to array state?

A) `items.push(newItem)`  
B) `setItems([...items, newItem])`  
C) `items[items.length] = newItem`  
D) `items.add(newItem)`  

**Answer**: B

---

### Question 5: Can you have multiple state variables?

A) No, only one per component  
B) Yes, as many as you need  
C) Only 3 maximum  
D) Only if they're related  

**Answer**: B

---

## Part 7: Optional Challenges

Try these ONLY after basic app works!

### Challenge 1: Add Edit Feature (Medium)

Allow users to edit existing todos.

**Specification**:
- Click "Edit" button on todo
- Input field appears with current text
- Save button to confirm
- Cancel button to cancel

### Challenge 2: Persist Todos (Medium)

Save todos to browser's localStorage.

**Specification**:
- Load todos from localStorage on startup
- Save todos to localStorage when they change
- Todos persist after page refresh

### Challenge 3: Filter Todos (Medium)

Add filters to show All, Active, or Completed todos.

**Specification**:
- Add filter buttons: All, Active, Completed
- Show only relevant todos based on filter
- Update count based on filter

### Challenge 4: Drag and Drop (Hard)

Reorder todos by dragging.

**Specification**:
- Drag todo to new position
- Update state with new order
- Show visual feedback while dragging

---

## Part 8: Day 5 Checklist

- [ ] Create project and files
- [ ] Create Todo interface
- [ ] Build TodoInput component with state
- [ ] Build TodoItem component
- [ ] Build TodoList main component with state
- [ ] Add CSS styling
- [ ] Run npm start (no errors!)
- [ ] Test functionality:
  - [ ] Add todos
  - [ ] Check/uncheck todos
  - [ ] Delete todos
  - [ ] Count displays correctly
- [ ] Test on mobile (responsive)
- [ ] (Optional) Complete Challenge 1
- [ ] (Optional) Complete Challenge 2
- [ ] Commit: `git commit -m "Day 5: Todo List App with useState"`

---

## Part 9: What You've Learned

✅ **What is state** - Component's own changing data  
✅ **How useState works** - Const [value, setter] = useState(initial)  
✅ **State triggers re-render** - UI updates when state changes  
✅ **Immutability** - Don't mutate state directly  
✅ **Array operations** - Spread operator to create new arrays  
✅ **Multiple state** - Can have as many state variables as needed  
✅ **Passing callbacks** - Parent passes handlers to children  
✅ **State flow** - Data flows down, events bubble up  

---

## Part 10: Next Steps

After completing Day 5:

1. ✅ Commit to GitHub
2. ✅ Review the Todo app - can you explain every line?
3. ✅ Try one of the challenges
4. ✅ Ready for **Day 6: useEffect Hook & Side Effects**

---

## When You're Done with Day 5:

**Let me know:**
1. Did your todo app work without errors?
2. Did you complete any challenges? (1-4)
3. What was hardest about state management?
4. Ready for Day 6?

---

**Congratulations on Day 5! 🎉**

You now understand **the most important concept in React** - STATE!

This is a major milestone. State is what makes React powerful! 💪

Ready for **Day 6: useEffect Hook & Side Effects**? 🚀
