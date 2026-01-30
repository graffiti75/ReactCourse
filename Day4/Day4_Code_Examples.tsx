// ========================================
// DAY 4: COMPONENTS, PROPS & EVENT HANDLING
// CARD COMPONENT LIBRARY
// Complete Code Examples & Solutions
// ========================================

// ===============================
// KEY CONCEPTS & HINTS
// ===============================

/*
CONCEPT 1: What are Props?
  Props = Data passed INTO a component
  Like function parameters:
  
  function greet(name) { ... }  // 'name' is parameter
  <Greeting name="Rodrigo" />   // 'name' is prop

CONCEPT 2: Props are Read-Only
  ✅ CORRECT: Display props
    const Card = ({ title }) => <h2>{title}</h2>
  
  ❌ WRONG: Modify props
    const Card = ({ title }) => {
      title = "New";  // ERROR!
    }

CONCEPT 3: TypeScript Interfaces for Props
  Define what props component accepts:
  
  interface CardProps {
    title: string;           // Required
    description?: string;    // Optional (?)
    onClick?: () => void;    // Optional callback
  }

CONCEPT 4: Event Handlers
  When user clicks button, call a function:
  
  const handleClick = () => { console.log("clicked"); }
  <button onClick={handleClick}>Click</button>
  
  Or pass callback through props:
  <button onClick={onButtonClick}>Click</button>

CONCEPT 5: Conditional Rendering
  Show/hide elements based on props:
  
  {onButtonClick && <button>Action</button>}
  // Only shows if onButtonClick exists

TECHNIQUE 1: Children Prop
  Pass content INSIDE component:
  
  <Card title="Title">
    <p>This is inside</p>
  </Card>
  
  Receive it:
  const Card = ({ children, title }) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  )

TECHNIQUE 2: CSS Classes for Styling
  Use className to apply different styles:
  
  <div className={`card card-${variant}`}>
  
  In CSS:
  .card-default { border-left: 4px solid blue; }
  .card-danger { border-left: 4px solid red; }

TECHNIQUE 3: Default Props
  Provide defaults in function parameters:
  
  const Card = ({
    title,
    buttonText = "Learn More",
    variant = "default"
  }) => { ... }
  
  User can override or use defaults.

TECHNIQUE 4: Composition
  Build small components, combine into larger ones:
  
  <Card>
    <CardHeader />
    <CardBody />
    <CardFooter />
  </Card>
*/

// ===============================
// FILE 1: src/components/Card.tsx
// Main Card Component
// ===============================

import './Card.css';

// Step 1: Define the props interface
interface CardProps {
  title: string;                          // Required: card title
  description: string;                    // Required: card description
  imageUrl: string;                       // Required: image path
  buttonText?: string;                    // Optional: button label (default: "Learn More")
  onButtonClick?: () => void;             // Optional: button click handler
  variant?: 'default' | 'success' | 'danger';  // Optional: card style variant
}

// Step 2: Create the component
const Card = ({
  title,
  description,
  imageUrl,
  buttonText = "Learn More",              // Default value
  onButtonClick,
  variant = 'default'                     // Default value
}: CardProps) => {
  return (
    // Step 3: Create the JSX structure
    <div className={`card card-${variant}`}>
      {/* Card Header Section */}
      <div className="card-header">
        <h2>{title}</h2>
      </div>

      {/* Card Body Section */}
      <div className="card-body">
        <img 
          src={imageUrl} 
          alt={title} 
          className="card-image" 
        />
        <p>{description}</p>
      </div>

      {/* Card Footer Section */}
      <div className="card-footer">
        {/* Step 4: Conditional button rendering */}
        {onButtonClick && (
          <button 
            onClick={onButtonClick}    // Event handler
            className="card-button"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

// ===============================
// FILE 2: src/App.tsx
// Main App Component (Using Card)
// ===============================

import React from 'react';
import Card from './components/Card';
import './App.css';

function App(): JSX.Element {
  // Step 1: Define event handler
  const handleCardClick = (): void => {
    console.log("Card button was clicked!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Card Component Library 🎨</h1>
        <p>Day 4: Components, Props & Event Handling</p>
      </header>

      <main className="card-grid">
        {/* Step 2: Use Card component with props */}
        
        {/* Card 1: With all props */}
        <Card
          title="React Basics"
          description="Learn the fundamentals of React including components, props, and state management."
          imageUrl="https://via.placeholder.com/300x200?text=React"
          buttonText="Learn More"
          onButtonClick={handleCardClick}
          variant="default"
        />

        {/* Card 2: Different variant and handler */}
        <Card
          title="TypeScript"
          description="Master TypeScript to write type-safe React applications with confidence."
          imageUrl="https://via.placeholder.com/300x200?text=TypeScript"
          buttonText="Get Started"
          onButtonClick={() => alert("Starting TypeScript!")}
          variant="success"
        />

        {/* Card 3: No button (onButtonClick not provided) */}
        <Card
          title="Advanced Patterns"
          description="Deep dive into advanced React patterns and best practices."
          imageUrl="https://via.placeholder.com/300x200?text=Advanced"
          variant="danger"
        />

        {/* Card 4: Using default buttonText */}
        <Card
          title="Component Design"
          description="Learn how to design reusable, maintainable components."
          imageUrl="https://via.placeholder.com/300x200?text=Design"
          onButtonClick={() => console.log("Design clicked")}
        />
      </main>
    </div>
  );
}

export default App;

// ===============================
// FILE 3: src/components/Card.css
// Card Styling
// ===============================

/*
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  background: white;
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
  font-weight: 600;
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
  font-size: 14px;
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
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #0056b3;
}

.card-button:active {
  transform: scale(0.98);
}

Variant Styles
.card-default {
  border-left: 4px solid #007bff;
}

.card-success {
  border-left: 4px solid #28a745;
}

.card-danger {
  border-left: 4px solid #dc3545;
}
*/

// ===============================
// FILE 4: src/App.css
// App Layout Styling
// ===============================

/*
.App {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.App-header {
  text-align: center;
  margin-bottom: 50px;
}

.App-header h1 {
  color: #333;
  font-size: 36px;
  margin: 0 0 10px 0;
  font-weight: 700;
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
*/

// ===============================
// ADVANCED EXAMPLES
// ===============================

// Example 1: Card with children prop
interface CardWithChildrenProps {
  title: string;
  variant?: 'default' | 'success' | 'danger';
  children?: React.ReactNode;  // Accept any content
}

const CardWithChildren = ({ 
  title, 
  variant = 'default',
  children 
}: CardWithChildrenProps) => {
  return (
    <div className={`card card-${variant}`}>
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

// Usage:
// <CardWithChildren title="Custom Card">
//   <p>Any content here</p>
//   <button>Custom button</button>
// </CardWithChildren>

// ===============================
// Example 2: Card with disabled button
interface CardWithDisabledProps extends CardProps {
  buttonDisabled?: boolean;
}

const CardWithDisabled = ({
  title,
  description,
  imageUrl,
  buttonText = "Learn More",
  onButtonClick,
  variant = 'default',
  buttonDisabled = false
}: CardWithDisabledProps) => {
  return (
    <div className={`card card-${variant}`}>
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <img src={imageUrl} alt={title} className="card-image" />
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {onButtonClick && (
          <button 
            onClick={onButtonClick}
            className="card-button"
            disabled={buttonDisabled}
            style={{
              opacity: buttonDisabled ? 0.5 : 1,
              cursor: buttonDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

// ===============================
// Example 3: Multiple buttons
interface CardWithActionsProps {
  title: string;
  description: string;
  imageUrl: string;
  actions?: Array<{
    label: string;
    handler: () => void;
  }>;
}

const CardWithActions = ({
  title,
  description,
  imageUrl,
  actions
}: CardWithActionsProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <img src={imageUrl} alt={title} className="card-image" />
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {actions && actions.map((action, index) => (
          <button 
            key={index}
            onClick={action.handler}
            className="card-button"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Usage:
// <CardWithActions
//   title="Card"
//   description="Description"
//   imageUrl="pic.jpg"
//   actions={[
//     { label: "Edit", handler: () => console.log("Edit") },
//     { label: "Delete", handler: () => console.log("Delete") }
//   ]}
// />

// ===============================
// TESTING CHECKLIST
// ===============================

/*
Test your Card component:

1. Card displays correctly
   - [ ] Title shows
   - [ ] Description shows
   - [ ] Image loads

2. Button works
   - [ ] Button shows when onButtonClick provided
   - [ ] Button hidden when onButtonClick not provided
   - [ ] Button text changes with buttonText prop
   - [ ] Click handler executes

3. Variants work
   - [ ] Default (blue border)
   - [ ] Success (green border)
   - [ ] Danger (red border)

4. Responsive
   - [ ] On desktop: cards in grid
   - [ ] On mobile: cards stack vertically
   - [ ] Image scales properly

5. Hover effects
   - [ ] Card lifts up on hover
   - [ ] Shadow increases on hover
   - [ ] Button color changes on hover

6. TypeScript
   - [ ] No TypeScript errors
   - [ ] Props are typed correctly
   - [ ] Optional props work
*/

// ===============================
// GIT COMMANDS FOR DAY 4
// ===============================

/*
# Create Day 4 folder
mkdir Day4-CardLibrary
cd Day4-CardLibrary

# Create project
npx create-react-app . --template typescript

# Build components
- Create src/components/Card.tsx
- Create src/components/Card.css
- Update src/App.tsx
- Update src/App.css

# Commit
git add .
git commit -m "Day 4: Card Component Library - Components, Props & Event Handling"
git push origin main
*/
