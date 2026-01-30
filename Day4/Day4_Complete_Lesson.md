# Day 4: Components, Props & Event Handling

**Duration**: 4-6 hours  
**Skill Level**: Beginner  
**Goal**: Build a reusable Card component library  
**Outcome**: A flexible Card component used across many projects

---

## Part 1: What You're Building & Why It Matters

### What is a Card Component?

A **Card** is a container that displays information in a boxed, organized way.

**Real-world examples**:
- Product cards on e-commerce sites (image, price, button)
- User profile cards (avatar, name, bio, follow button)
- Blog post cards (title, excerpt, date, read more link)
- Team member cards (photo, name, role, contact info)

### Visual Example

```
┌─────────────────────────────┐
│  My Awesome Product         │  ← Title
├─────────────────────────────┤
│  [Image placeholder]        │  ← Content
├─────────────────────────────┤
│  $29.99                     │  ← Price
│  [Add to Cart] [Wishlist]   │  ← Actions/Buttons
└─────────────────────────────┘
```

### Why Build a Card Library?

- **Reusable** - Use the same Card in many places
- **Consistent** - All cards look the same
- **Flexible** - Pass different content via props
- **Professional** - Real-world UI pattern
- **Portfolio** - Shows you can build reusable components

---

## Part 2: Understanding the Approach

### Key Concept 1: What are Props?

Props are like **function parameters** for React components.

```javascript
// Regular function with parameters
function greet(name, age) {
  return `Hello ${name}, you are ${age}`;
}
greet("Rodrigo", 30);

// React component with props
function Card({ title, description, image }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image} />
      <p>{description}</p>
    </div>
  );
}
<Card title="Product" description="Great item" image="pic.jpg" />
```

**Props pass data INTO the component.**

### Key Concept 2: Props are Read-Only

You can READ props, but you CANNOT change them.

```typescript
// ❌ WRONG - Don't do this
const Card = ({ title }) => {
  title = "New Title";  // ERROR! Can't modify
};

// ✅ CORRECT - Read props, use them
const Card = ({ title }) => {
  return <h2>{title}</h2>;
};
```

### Key Concept 3: TypeScript Interfaces for Props

Define what props your component accepts:

```typescript
// Define the shape of props
interface CardProps {
  title: string;          // Required
  description?: string;   // Optional (?)
  image: string;         // Required
  onButtonClick?: () => void;  // Optional callback
}

// Use the interface
const Card = ({ title, description, image, onButtonClick }: CardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={image} />
      {onButtonClick && <button onClick={onButtonClick}>Click Me</button>}
    </div>
  );
};
```

### Key Concept 4: Event Handlers

When user clicks a button, run a function:

```typescript
// Define the handler
const handleClick = (): void => {
  console.log("Button clicked!");
};

// Pass it to the element
<button onClick={handleClick}>Click Me</button>

// Or pass a callback FROM props
const Card = ({ onButtonClick }: CardProps) => {
  return <button onClick={onButtonClick}>Click Me</button>;
};

// Use it
<Card onButtonClick={() => console.log("clicked!")} />
```

### Key Concept 5: Conditional Rendering

Show or hide elements based on props:

```typescript
const Card = ({ showButton, buttonText }: CardProps) => {
  return (
    <div>
      {showButton && <button>{buttonText}</button>}
      {/* Only renders if showButton is true */}
    </div>
  );
};
```

### Key Technique 1: Composition

Build small components, combine them into larger ones:

```
Card Component
├── CardHeader (title, optional close button)
├── CardBody (main content)
├── CardFooter (actions/buttons)
```

### Key Technique 2: Children Prop

Pass content INSIDE a component:

```typescript
// Using children prop
const Card = ({ children, title }: CardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}  {/* Whatever you put inside <Card></Card> */}
    </div>
  );
};

// Use it
<Card title="My Card">
  <p>This is the content inside the card</p>
  <button>Action</button>
</Card>
```

### Key Technique 3: CSS Classes for Styling

Give elements className so you can style them:

```typescript
const Card = ({ variant = "default" }: CardProps) => {
  return (
    <div className={`card card-${variant}`}>
      {/* In CSS: .card-default { ... } .card-danger { ... } */}
    </div>
  );
};
```

---

## Part 3: Step-by-Step Building Process

### Step 1: Create Project & Files

```bash
npx create-react-app day4-card-library --template typescript
cd day4-card-library
mkdir src/components
```

Create files:
- `src/components/Card.tsx` (your main component)
- `src/components/Card.css` (styling)

### Step 2: Define Props Interface

Start with thinking: "What data does a Card need?"

```typescript
// src/components/Card.tsx

import './Card.css';

interface CardProps {
  title: string;              // Required: card title
  description: string;        // Required: card content
  imageUrl: string;          // Required: image path
  buttonText?: string;       // Optional: button label
  onButtonClick?: () => void; // Optional: button callback
  variant?: 'default' | 'success' | 'danger';  // Optional: card style
}

const Card = ({
  title,
  description,
  imageUrl,
  buttonText = "Learn More",
  onButtonClick,
  variant = 'default'
}: CardProps) => {
  // TODO: Return JSX here
};

export default Card;
```

### Step 3: Create the JSX Structure

```typescript
return (
  <div className={`card card-${variant}`}>
    {/* Card Header */}
    <div className="card-header">
      <h2>{title}</h2>
    </div>

    {/* Card Body */}
    <div className="card-body">
      <img src={imageUrl} alt={title} className="card-image" />
      <p>{description}</p>
    </div>

    {/* Card Footer */}
    <div className="card-footer">
      {onButtonClick && (
        <button onClick={onButtonClick} className="card-button">
          {buttonText}
        </button>
      )}
    </div>
  </div>
);
```

**Key points**:
- Props are displayed in `{}`
- `{onButtonClick && ...}` only shows button if callback exists
- `onClick={onButtonClick}` connects the button to the handler

### Step 4: Basic Styling

Create `src/components/Card.css`:

```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 16px;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.card-body {
  padding: 16px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
}

.card-body p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.card-footer {
  padding: 16px;
  background: #f9f9f9;
  border-top: 1px solid #eee;
  text-align: right;
}

.card-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #0056b3;
}

/* Variant styles */
.card-success {
  border-left: 4px solid #28a745;
}

.card-danger {
  border-left: 4px solid #dc3545;
}

.card-default {
  border-left: 4px solid #007bff;
}
```

### Step 5: Use the Card in App.tsx

```typescript
import React from 'react';
import Card from './components/Card';
import './App.css';

function App(): JSX.Element {
  const handleCardClick = (): void => {
    console.log("Card button clicked!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Card Component Library 🎨</h1>
        <p>Day 4: Components, Props & Event Handling</p>
      </header>

      <main className="card-grid">
        {/* Card 1 */}
        <Card
          title="React Basics"
          description="Learn the fundamentals of React including components, props, and state management."
          imageUrl="https://via.placeholder.com/300x200?text=React"
          buttonText="Learn More"
          onButtonClick={handleCardClick}
          variant="default"
        />

        {/* Card 2 */}
        <Card
          title="TypeScript"
          description="Master TypeScript to write type-safe React applications with confidence."
          imageUrl="https://via.placeholder.com/300x200?text=TypeScript"
          buttonText="Get Started"
          onButtonClick={() => alert("Starting TypeScript!")}
          variant="success"
        />

        {/* Card 3 */}
        <Card
          title="Advanced Patterns"
          description="Deep dive into advanced React patterns and best practices."
          imageUrl="https://via.placeholder.com/300x200?text=Advanced"
          variant="danger"
        />
      </main>
    </div>
  );
}

export default App;
```

### Step 6: Add App.css for Layout

```css
.App {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.App-header {
  text-align: center;
  margin-bottom: 40px;
}

.App-header h1 {
  color: #333;
  font-size: 36px;
  margin: 0 0 10px 0;
}

.App-header p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .App-header h1 {
    font-size: 24px;
  }
}
```

### Step 7: Test It

```bash
npm start
```

You should see:
- ✅ 3 cards displayed in a grid
- ✅ Cards have titles, images, descriptions
- ✅ Cards have buttons with different behaviors
- ✅ Cards have different colored left borders
- ✅ Cards hover with animation
- ✅ Responsive on mobile

---

## Part 4: Troubleshooting Guide

### Problem: Props not displaying
**Check**:
- ✅ Are you using `{}` to display props? `<h2>{title}</h2>`
- ✅ Are you passing props when using Card? `<Card title="..."`
- ✅ Is the prop name correct? (check interface)

### Problem: Button doesn't work
**Check**:
- ✅ Did you add `onClick={onButtonClick}` to button?
- ✅ Are you passing `onButtonClick` prop when using Card?
- ✅ Is the function defined? `const handleCardClick = () => {}`

### Problem: Conditional button not showing
**Check**:
- ✅ Did you use `{onButtonClick && ...}`?
- ✅ Are you passing `onButtonClick` prop?
- ✅ Try adding: `buttonText` prop if button text isn't showing

### Problem: Styling not applying
**Check**:
- ✅ Did you create `Card.css`?
- ✅ Did you import it? `import './Card.css'`
- ✅ Are className names matching CSS? (e.g., `card` matches `.card`)
- ✅ Is npm start running?

### Problem: TypeScript errors about props
**Check**:
- ✅ Did you define the interface? `interface CardProps { ... }`
- ✅ Are all required props provided when using Card?
- ✅ Optional props should have `?` in interface

### Problem: Cards not in a grid
**Check**:
- ✅ Did you add `.card-grid` CSS?
- ✅ Is the CSS imported in App?
- ✅ Check that `display: grid` is in `.card-grid`

---

## Part 5: Hands-On Challenges (OPTIONAL)

Start these ONLY after basic Card component works!

### Challenge 1: Add Badge Prop (Easy)

Add a badge that shows in the top-right corner of the card.

**Specification**:
- Add `badge?: string` prop to CardProps
- Display badge in card header
- Style it as a small colored label

### Challenge 2: Disable Button Prop (Easy)

Add ability to disable the button.

**Specification**:
- Add `buttonDisabled?: boolean` prop
- When true, button shows as greyed out
- Button doesn't respond to clicks when disabled

### Challenge 3: Multiple Buttons (Medium)

Allow card to have multiple action buttons.

**Specification**:
- Change `buttonText` and `onButtonClick` to arrays
- Display multiple buttons in footer
- Each button has its own handler

### Challenge 4: Card Sizes (Medium)

Support small, medium, and large card variants.

**Specification**:
- Add `size?: 'small' | 'medium' | 'large'` prop
- Change padding, font sizes based on size
- Update image height for each size

### Challenge 5: Custom Children (Hard)

Use React's `children` prop for custom card content.

**Specification**:
- Add `children?: React.ReactNode` to props
- Allow users to put ANY content inside card
- Keep card structure (header, footer) but allow custom body

---

## Part 6: Checklist - Build Step by Step

- [ ] Create project and files
- [ ] Define CardProps interface with all props
- [ ] Create Card component shell
- [ ] Add JSX structure (header, body, footer)
- [ ] Add basic CSS styling
- [ ] Create App.tsx with 3 card examples
- [ ] Add App.css for grid layout
- [ ] Test in browser:
  - [ ] Cards display correctly
  - [ ] All text shows
  - [ ] Images load
  - [ ] Buttons work
  - [ ] Variants (colors) apply
  - [ ] Hover animation works
  - [ ] Responsive on mobile
- [ ] (Optional) Complete Challenge 1
- [ ] (Optional) Complete Challenge 2
- [ ] Commit: `git commit -m "Day 4: Card Component Library"`

---

## Part 7: Quiz - Test Your Understanding 📝

### Question 1: What are props?

A) Global variables  
B) Data passed INTO a component  
C) Component's internal state  
D) CSS styling  

**Answer**: B

---

### Question 2: Can you modify props inside a component?

A) Yes, always  
B) Yes, but only in useEffect  
C) No, props are read-only  
D) Only for TypeScript  

**Answer**: C

---

### Question 3: What does `buttonDisabled?: boolean` mean in an interface?

A) Button is always disabled  
B) buttonDisabled prop is optional  
C) Button should be disabled  
D) None of the above  

**Answer**: B

---

### Question 4: How do you pass data to a component?

A) Via props  
B) Via useState  
C) Via context  
D) Via localStorage  

**Answer**: A

---

### Question 5: What does `{onButtonClick && ...}` do?

A) Only shows if onButtonClick exists  
B) Always shows  
C) Shows if onButtonClick is false  
D) Passes onButtonClick to child  

**Answer**: A

---

## Part 8: Key Takeaways

✅ **Props** = Function parameters for React components  
✅ **Props are read-only** = Don't change them inside component  
✅ **Interfaces define props** = TypeScript knows what props you need  
✅ **Optional props use ?** = `prop?: type` means it's optional  
✅ **Callbacks via props** = Pass functions to handle events  
✅ **Conditional rendering** = `{condition && element}`  
✅ **Reusable components** = Same Card, different data  

---

## Part 9: Next Steps

After completing Day 4:

1. ✅ Commit to GitHub
2. ✅ Review the Card component - can you explain every line?
3. ✅ Try using Card with different props
4. ✅ Ready for **Day 5: useState Hook & Component State**

---

## When You're Done with Day 4:

**Let me know:**
1. Did your Card component work without errors?
2. Did you complete any challenges? (1-5)
3. What was hardest about props/events?
4. Ready for Day 5?

---

**Congratulations on Day 4! 🎉**

You've now built your first **reusable component library** - the foundation of React development!

Ready for **Day 5: useState Hook & Component State**? 🚀
