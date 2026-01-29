# Day 3: First Mini-Project - Interactive Component

**Duration**: 4-6 hours  
**Skill Level**: Beginner  
**Goal**: Build a new interactive component from scratch with TypeScript  
**Outcome**: A polished, reusable interactive component ready for portfolio

---

## Part 1: Project Overview

### What You'll Build

You'll create an **Interactive Star Rating Component** - a professional UI element used on e-commerce sites, review platforms, and rating systems.

**Features**:

- ✅ Click to rate (1-5 stars)
- ✅ Hover preview (see rating before clicking)
- ✅ Display current rating
- ✅ Reset rating
- ✅ Smooth animations
- ✅ Fully typed with TypeScript
- ✅ Responsive design

### Why This Project?

1. **Portfolio piece** - Shows employers you can build components
2. **Real-world use** - Used on actual websites
3. **TypeScript practice** - Apply what you learned on Day 2
4. **Design polish** - Make it look professional
5. **Standalone** - Can be reused in other projects

### Visual Example

```
☆ ☆ ☆ ☆ ☆  (hover over stars, see preview)
★ ★ ★ ☆ ☆  (3 stars selected)

Current Rating: 3/5
[Reset Rating]
```

---

## Part 1.5: Understanding the Approach (IMPORTANT - READ THIS FIRST)

Before you write ANY code, understand **HOW** you'll build this.

### Key Techniques You'll Use

#### Technique 1: Unicode Star Characters

You don't need images! Use text characters:

```
★ = Filled star (Unicode character)
☆ = Empty star (Unicode character)
```

Just put them in `<span>` elements:

```typescript
<span>★</span>  // Shows a filled star
<span>☆</span>  // Shows an empty star
```

#### Technique 2: Using Array.map to Create Multiple Stars

To create 5 stars, use a loop:

```typescript
Array.from({ length: 5 }).map((_, index) => (
  <span key={index}>★</span>
))
```

The `index` tells you which star (0-4). You'll use this to decide if it's filled or empty.

#### Technique 3: Two State Variables (Critical!)

You need TWO separate pieces of state:

```typescript
const [rating, setRating] = useState(0); // What user SELECTED
const [hoverRating, setHoverRating] = useState(0); // What user is HOVERING over
```

**Why two?** When user hovers, you show a PREVIEW without SAVING the rating yet.

When displaying stars: Show whichever is higher (hoverRating or rating)

#### Technique 4: Deciding if a Star is Filled or Empty

Logic:

```
If rating = 3:
  - Star at index 0: 0+1 = 1, is 1 ≤ 3? YES → Filled ★
  - Star at index 1: 1+1 = 2, is 2 ≤ 3? YES → Filled ★
  - Star at index 2: 2+1 = 3, is 3 ≤ 3? YES → Filled ★
  - Star at index 3: 3+1 = 4, is 4 ≤ 3? NO → Empty ☆
  - Star at index 4: 4+1 = 5, is 5 ≤ 3? NO → Empty ☆
```

Simple comparison: if (index + 1) <= currentRating, show ★, else show ☆

#### Technique 5: Event Handlers

Four event handlers you need:

```typescript
// When user CLICKS a star at index 0, 1, 2, 3, or 4
const handleStarClick = (starIndex: number) => {
  const newRating = starIndex + 1; // Convert 0-4 to 1-5
  setRating(newRating);
};

// When user HOVERS over a star
const handleStarHover = (starIndex: number) => {
  const hoverValue = starIndex + 1;
  setHoverRating(hoverValue);
};

// When user LEAVES the stars area
const handleLeave = () => {
  setHoverRating(0); // Clear the hover preview
};

// When user clicks RESET button
const handleReset = () => {
  setRating(0);
};
```

#### Technique 6: Which Rating to Display?

When rendering stars, decide which rating to show:

```typescript
const displayRating = hoverRating || rating;
// If hoverRating is > 0, use it. Otherwise use rating.
```

This shows the hover preview when hovering, actual rating otherwise.

---

## Part 2: Project Setup

### Step 1: Create New TypeScript Project

```bash
npx create-react-app day3-star-rating --template typescript
cd day3-star-rating
npm start
```

### Step 2: Project Structure

```
day3-star-rating/
├── src/
│   ├── components/
│   │   └── StarRating.tsx      (your component)
│   ├── App.tsx                 (main app)
│   ├── App.css                 (styling)
│   └── index.tsx
├── package.json
└── README.md
```

### Step 3: Create Components Folder

```bash
mkdir src/components
```

---

## Part 3: TypeScript Interfaces

### Define Component Props

Create `src/components/StarRating.tsx` with these interfaces:

```typescript
// Define the props your component accepts
interface StarRatingProps {
  maxStars?: number; // How many stars (default: 5)
  onRatingChange?: (rating: number) => void; // Callback when rating changes
  initialRating?: number; // Starting rating (default: 0)
  size?: "small" | "medium" | "large"; // Star size
}

// Define the component's internal state interface
interface StarRatingState {
  rating: number; // Current selected rating
  hoverRating: number; // Hovering over which star
}
```

### Why Interfaces?

- **Type safety**: Component won't accept wrong prop types
- **IDE help**: Autocomplete when using the component
- **Self-documenting**: Other developers know what props to pass
- **Error prevention**: Catch mistakes before runtime

---

## Part 4: Build the Component

### Step 1: Component Shell

```typescript
import { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = 'medium'
}: StarRatingProps) => {
  // State
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Handlers will go here

  return (
    <div className="star-rating-container">
      {/* Component JSX will go here */}
    </div>
  );
};

export default StarRating;
```

### Step 2: Add Event Handlers

```typescript
// When user clicks a star
const handleStarClick = (starIndex: number): void => {
  const newRating: number = starIndex + 1;
  setRating(newRating);

  // Call parent callback if provided
  if (onRatingChange) {
    onRatingChange(newRating);
  }
};

// When user hovers over a star
const handleStarHover = (starIndex: number): void => {
  setHoverRating(starIndex + 1);
};

// When user leaves stars
const handleLeave = (): void => {
  setHoverRating(0);
};

// Reset to initial rating
const handleReset = (): void => {
  setRating(initialRating);
  if (onRatingChange) {
    onRatingChange(initialRating);
  }
};
```

### Step 3: Build the Component Step-by-Step

#### 3A: Start with the Shell

Create the basic structure first:

```typescript
import { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = 'medium'
}: StarRatingProps) => {
  // TODO: Add state here
  // TODO: Add event handlers here
  // TODO: Add JSX here
  return (
    <div className={`star-rating-container size-${size}`}>
      {/* Component content */}
    </div>
  );
};

export default StarRating;
```

#### 3B: Add State Variables

Add the two state variables (use the technique from Part 1.5):

```typescript
const [rating, setRating] = useState<number>(initialRating);
const [hoverRating, setHoverRating] = useState<number>(0);
```

#### 3C: Add Event Handlers

Write the 4 event handlers (use the patterns from Part 1.5):

```typescript
const handleStarClick = (starIndex: number): void => {
  const newRating: number = starIndex + 1;
  setRating(newRating);
  if (onRatingChange) {
    onRatingChange(newRating);
  }
};

const handleStarHover = (starIndex: number): void => {
  setHoverRating(starIndex + 1);
};

const handleLeave = (): void => {
  setHoverRating(0);
};

const handleReset = (): void => {
  setRating(initialRating);
  if (onRatingChange) {
    onRatingChange(initialRating);
  }
};
```

#### 3D: Create the Stars Display

Use Array.map to create stars (technique from Part 1.5):

```typescript
const displayRating: number = hoverRating || rating;

<div className="stars">
  {Array.from({ length: maxStars }).map((_, index) => (
    <span
      key={index}
      className="star"
      onClick={() => handleStarClick(index)}
      onMouseEnter={() => handleStarHover(index)}
      onMouseLeave={handleLeave}
    >
      {/* TODO: Show ★ if filled, ☆ if empty */}
    </span>
  ))}
</div>
```

**TODO**: Replace the comment with logic to show ★ or ☆

Hint: Use the comparison from Part 1.5 - if (index + 1) <= displayRating

#### 3E: Display Rating and Reset Button

```typescript
<div className="rating-display">
  <p className="rating-text">
    Rating: <span className="rating-number">{rating}</span> / {maxStars}
  </p>
  {rating > 0 && (
    <button onClick={handleReset} className="reset-button">
      Reset Rating
    </button>
  )}
</div>
```

### Step 4: Render Stars (Helper Function)

```typescript
// Helper function to determine star type
const getStarType = (starIndex: number): string => {
  const currentRating: number = hoverRating || rating;
  const starNumber: number = starIndex + 1;

  if (starNumber <= currentRating) {
    return 'filled';   // Full star ★
  } else {
    return 'empty';    // Empty star ☆
  }
};

// Main JSX
return (
  <div className={`star-rating-container size-${size}`}>
    <div className="stars">
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          className={`star ${getStarType(index)}`}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleLeave}
          role="button"
          tabIndex={0}
        >
          {getStarType(index) === 'filled' ? '★' : '☆'}
        </span>
      ))}
    </div>

    <div className="rating-display">
      <p className="rating-text">
        Rating: <span className="rating-number">{rating}</span> / {maxStars}
      </p>
      {rating > 0 && (
        <button
          onClick={handleReset}
          className="reset-button"
        >
          Reset Rating
        </button>
      )}
    </div>
  </div>
);
```

### Complete StarRating.tsx Component

```typescript
import { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = 'medium'
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarClick = (starIndex: number): void => {
    const newRating: number = starIndex + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleStarHover = (starIndex: number): void => {
    setHoverRating(starIndex + 1);
  };

  const handleLeave = (): void => {
    setHoverRating(0);
  };

  const handleReset = (): void => {
    setRating(initialRating);
    if (onRatingChange) {
      onRatingChange(initialRating);
    }
  };

  const getStarType = (starIndex: number): string => {
    const currentRating: number = hoverRating || rating;
    const starNumber: number = starIndex + 1;
    return starNumber <= currentRating ? 'filled' : 'empty';
  };

  return (
    <div className={`star-rating-container size-${size}`}>
      <div className="stars">
        {Array.from({ length: maxStars }).map((_, index) => (
          <span
            key={index}
            className={`star ${getStarType(index)}`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleLeave}
            role="button"
            tabIndex={0}
          >
            {getStarType(index) === 'filled' ? '★' : '☆'}
          </span>
        ))}
      </div>

      <div className="rating-display">
        <p className="rating-text">
          Rating: <span className="rating-number">{rating}</span> / {maxStars}
        </p>
        {rating > 0 && (
          <button
            onClick={handleReset}
            className="reset-button"
          >
            Reset Rating
          </button>
        )}
      </div>
    </div>
  );
};

export default StarRating;
```

---

## Part 5: Styling

### Create `src/components/StarRating.css`

```css
.star-rating-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.star {
  font-size: 60px;
  cursor: pointer;
  color: #ffd700;
  transition: all 0.2s ease;
  user-select: none;
}

.star:hover {
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.star.filled {
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

.star.empty {
  color: rgba(255, 215, 0, 0.3);
}

.rating-display {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.rating-text {
  color: white;
  font-size: 18px;
  margin: 0 0 15px 0;
  font-weight: 500;
}

.rating-number {
  font-size: 28px;
  font-weight: bold;
  color: #ffd700;
}

.reset-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.reset-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.reset-button:active {
  transform: translateY(0);
}

/* Size variations */
.size-small .star {
  font-size: 30px;
  gap: 8px;
}

.size-medium .star {
  font-size: 60px;
  gap: 15px;
}

.size-large .star {
  font-size: 80px;
  gap: 20px;
}

/* Responsive */
@media (max-width: 600px) {
  .star-rating-container {
    padding: 20px;
  }

  .stars {
    gap: 10px;
  }

  .star {
    font-size: 40px;
  }

  .rating-text {
    font-size: 16px;
  }

  .rating-number {
    font-size: 24px;
  }
}
```

---

## Part 6: Update App.tsx

Replace `src/App.tsx`:

```typescript
import React from 'react';
import StarRating from './components/StarRating';
import './App.css';

function App(): JSX.Element {
  const handleRatingChange = (rating: number): void => {
    console.log(`User rated: ${rating} stars`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Rating Component 🌟</h1>
        <p>Day 3: Interactive Component Mini-Project</p>
      </header>

      <main>
        <StarRating
          maxStars={5}
          size="medium"
          onRatingChange={handleRatingChange}
        />
      </main>
    </div>
  );
}

export default App;
```

### Update `src/App.css`

```css
.App {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
}

.App-header {
  text-align: center;
  margin-bottom: 40px;
}

.App-header h1 {
  color: #1f4e78;
  font-size: 48px;
  margin: 0 0 10px 0;
}

.App-header p {
  color: #666;
  font-size: 18px;
  margin: 0;
}

main {
  max-width: 600px;
  margin: 0 auto;
}
```

---

## Part 7: Run Your Project

```bash
npm start
```

Your star rating component should now:

- ✅ Display 5 stars
- ✅ Show empty/filled stars on click
- ✅ Show preview on hover
- ✅ Display current rating
- ✅ Have a reset button
- ✅ Look professional
- ✅ Be fully typed with TypeScript

---

## Part 8: Troubleshooting Guide

If something doesn't work, check here:

### Problem: Stars don't respond to clicks

**Check**:

- ✅ Did you add `onClick={handleStarClick}` to the span?
- ✅ Did you write the `handleStarClick` function?
- ✅ Is `setRating` being called?

### Problem: Hover preview doesn't work

**Check**:

- ✅ Did you add `onMouseEnter` and `onMouseLeave`?
- ✅ Are you using `hoverRating` to display?
- ✅ Does `setHoverRating` get called?

### Problem: Stars all look the same

**Check**:

- ✅ Is your comparison correct? (index + 1) <= displayRating
- ✅ Are you showing ★ and ☆ correctly?

### Problem: Reset button not showing

**Check**:

- ✅ Did you use `{rating > 0 && ...}`?

### Problem: Styling not applying

**Check**:

- ✅ Did you create `StarRating.css`?
- ✅ Did you import it with `import './StarRating.css'`?
- ✅ Are className names correct?

---

## Part 9: Hands-On Challenges (OPTIONAL)

Start with these only AFTER you get the basic component working!

### Challenge 1: Add Color Customization (Easy)

Add a `color` prop to customize the star color:

```typescript
interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;  // Add this
}

// Update CSS to use the color prop
style={{ color: color || '#ffd700' }}
```

---

### Challenge 2: Add Feedback Messages (Medium)

Display different messages based on rating:

```typescript
const getFeedbackMessage = (rating: number): string => {
  if (rating === 0) return "Click to rate!";
  if (rating <= 2) return "Poor";
  if (rating <= 3) return "Good";
  if (rating <= 4) return "Very Good";
  return "Excellent!";
};

// Display in JSX:
<p className="feedback">{getFeedbackMessage(rating)}</p>
```

---

### Challenge 3: Add Animation (Medium)

Add smooth transition when star rating changes:

```css
.star {
  transition: all 0.2s ease;
}

.star.filled {
  animation: fillStar 0.3s ease;
}

@keyframes fillStar {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

### Challenge 4: Add Half Stars (Hard)

Allow rating in 0.5 increments (like real review systems):

```typescript
const handleStarClick = (starIndex: number, isHalf: boolean): void => {
  const newRating: number = isHalf ? starIndex + 0.5 : starIndex + 1;
  setRating(newRating);
  if (onRatingChange) {
    onRatingChange(newRating);
  }
};

// Update rendering to show half stars
const getStarDisplay = (starIndex: number): "filled" | "half" | "empty" => {
  const currentRating: number = hoverRating || rating;
  if (starIndex + 1 <= currentRating) return "filled";
  if (starIndex + 0.5 <= currentRating) return "half";
  return "empty";
};
```

---

## Part 9: Quiz - Test Your Understanding 📝

### Question 1: What's the purpose of interfaces in React?

A) To style components  
B) To define component props shape  
C) To make components faster  
D) To organize files

**Answer**: B

---

### Question 2: What does `onRatingChange?.call()` do?

A) Always calls the function  
B) Only calls if the function exists (optional chaining)  
C) Calls the function with a delay  
D) None of the above

**Answer**: B

---

### Question 3: How do you render multiple elements in React?

A) Use `<>` and `</>`  
B) Use `<div>` and `</div>`  
C) Use `Array.map()`  
D) All of the above

**Answer**: D

---

### Question 4: What's the `:` in `size: 'small' | 'medium' | 'large'`?

A) Part of CSS  
B) TypeScript type annotation  
C) Array notation  
D) Object notation

**Answer**: B

---

### Question 5: What does `useState<number>(0)` mean?

A) State that can be any type  
B) State that must be a number, starting at 0  
C) A function that returns numbers  
D) An interface definition

**Answer**: B

---

## Part 10: Commit to GitHub

```bash
# Add your files
git add .

# Commit with message
git commit -m "Day 3: Star Rating Component - First Mini-Project"

# Push to GitHub
git push origin main
```

Create a new folder in your repo:

```
react-typescript-course/
├── Day1-Counter-App/
├── Day2-TypeScript-Counter/
└── Day3-StarRating-Component/  ← Your new project
    ├── src/
    ├── public/
    └── package.json
```

---

## Day 3 Summary

### What You Learned:

✅ Building components from scratch  
✅ TypeScript interfaces for props  
✅ State management with hooks  
✅ Event handling (click, hover)  
✅ Conditional rendering  
✅ Array.map() for rendering lists  
✅ CSS transitions and animations  
✅ Component callbacks (onRatingChange)

### What You Built:

✅ Professional star rating component  
✅ Fully typed with TypeScript  
✅ Reusable across projects  
✅ Production-quality code

### Key Takeaways:

1. Always define props interfaces first
2. Use TypeScript for type safety
3. Make components configurable (props)
4. Add smooth animations
5. Test all interactions
6. Commit to GitHub with clear messages

---

## Day 3 Challenge Checklist:

- [ ] Create TypeScript React project
- [ ] Create StarRating component
- [ ] Copy StarRating.tsx code
- [ ] Copy StarRating.css styling
- [ ] Update App.tsx
- [ ] Run npm start (no errors!)
- [ ] Test all interactions:
  - [ ] Click stars to rate
  - [ ] Hover to preview
  - [ ] Reset button works
- [ ] Complete Challenge 1 (Color customization)
- [ ] Complete Challenge 2 (Feedback messages)
- [ ] Complete Challenge 3 (Animations)
- [ ] Complete Challenge 4 (Half stars) - OPTIONAL
- [ ] Take the quiz (aim for 5/5)
- [ ] Commit to GitHub
- [ ] Deploy to Vercel (optional)

---

## When You're Done with Day 3:

**Let me know:**

1. Did your component work without errors?
2. How many challenges did you complete? (1-4)
3. What did you find challenging?
4. Ready for Day 4?

---

**Congratulations on Day 3! 🎉**

You've now built your **first mini-project** - a professional, reusable component!

This goes straight into your portfolio. **Show this to employers!** 💼

Ready for **Day 4: React Hooks - Part 1**? 🚀
