// ========================================
// DAY 3: FIRST MINI-PROJECT
// STAR RATING COMPONENT
// Complete Code Examples & Solutions
// ========================================

// ===============================
// FILE 1: src/components/StarRating.tsx
// Main Star Rating Component
// ===============================

import { useState } from 'react';
import './StarRating.css';

// Define props interface
interface StarRatingProps {
  maxStars?: number;                      // Default: 5
  onRatingChange?: (rating: number) => void;
  initialRating?: number;                 // Default: 0
  size?: 'small' | 'medium' | 'large';   // Default: medium
  color?: string;                         // Challenge 1
}

const StarRating = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = 'medium',
  color = '#ffd700'
}: StarRatingProps) => {
  // State
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Event Handlers
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

  // Helper function to determine star appearance
  const getStarType = (starIndex: number): string => {
    const currentRating: number = hoverRating || rating;
    const starNumber: number = starIndex + 1;
    
    if (starNumber <= currentRating) {
      return 'filled';
    } else {
      return 'empty';
    }
  };

  // Challenge 2: Feedback Messages
  const getFeedbackMessage = (currentRating: number): string => {
    if (currentRating === 0) return "Click to rate!";
    if (currentRating <= 2) return "Poor";
    if (currentRating === 3) return "Good";
    if (currentRating === 4) return "Very Good";
    return "Excellent!";
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
            style={{ color }}
          >
            {getStarType(index) === 'filled' ? '★' : '☆'}
          </span>
        ))}
      </div>

      <div className="rating-display">
        {/* Challenge 2: Add feedback message */}
        <p className="feedback-message">
          {getFeedbackMessage(rating)}
        </p>

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

// ===============================
// CHALLENGE 4: HALF STARS VERSION
// (Advanced - Optional)
// ===============================

interface StarRatingHalfProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
}

const StarRatingWithHalves = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0
}: StarRatingHalfProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarClick = (starIndex: number, isHalf: boolean): void => {
    const newRating: number = isHalf ? starIndex + 0.5 : starIndex + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleHover = (starIndex: number, isHalf: boolean): void => {
    const hoverValue: number = isHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(hoverValue);
  };

  const getStarDisplay = (starIndex: number): 'filled' | 'half' | 'empty' => {
    const currentRating: number = hoverRating || rating;
    const starNumber: number = starIndex + 1;

    if (starNumber <= currentRating) {
      return 'filled';
    } else if (starNumber - 0.5 <= currentRating) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  return (
    <div className="star-rating-container">
      <div className="stars">
        {Array.from({ length: maxStars }).map((_, index) => (
          <div key={index} className="star-wrapper">
            {/* Left half (for half star) */}
            <span
              className={`star star-half-left ${getStarDisplay(index) === 'half' ? 'filled' : ''}`}
              onClick={() => handleStarClick(index, true)}
              onMouseEnter={() => handleHover(index, true)}
            >
              ★
            </span>

            {/* Right half (for full star) */}
            <span
              className={`star star-half-right ${getStarDisplay(index) === 'filled' ? 'filled' : ''}`}
              onClick={() => handleStarClick(index, false)}
              onMouseEnter={() => handleHover(index, false)}
            >
              ★
            </span>
          </div>
        ))}
      </div>

      <p className="rating-text">
        Rating: {rating} / {maxStars}
      </p>
    </div>
  );
};

// ===============================
// FILE 2: src/App.tsx
// Main App Component
// ===============================

import React from 'react';
import StarRating from './components/StarRating';
import './App.css';

function App(): JSX.Element {
  // Handle rating change
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
          color="#ffd700"
        />
      </main>
    </div>
  );
}

export default App;

// ===============================
// FILE 3: src/components/StarRating.css
// Star Rating Styling
// ===============================

/*
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

.feedback-message {
  color: #ffd700;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
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

Size variations
.size-small .stars {
  gap: 8px;
}

.size-small .star {
  font-size: 30px;
}

.size-medium .stars {
  gap: 15px;
}

.size-medium .star {
  font-size: 60px;
}

.size-large .stars {
  gap: 20px;
}

.size-large .star {
  font-size: 80px;
}

Responsive
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
*/

// ===============================
// FILE 4: src/App.css
// App Styling
// ===============================

/*
.App {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
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
*/

// ===============================
// TYPESCRIPT INTERFACES REVIEW
// ===============================

/*
Interface defines what props component accepts:

interface StarRatingProps {
  maxStars?: number;                      // Optional, default 5
  onRatingChange?: (rating: number) => void;  // Optional callback
  initialRating?: number;                 // Optional, default 0
  size?: 'small' | 'medium' | 'large';   // Union type
  color?: string;                         // Optional color
}

? means optional
| means "or" (union type)
=> indicates function type
*/

// ===============================
// ANIMATION KEYFRAMES (CSS)
// ===============================

/*
Challenge 3: Add animations

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

.star.filled {
  animation: fillStar 0.3s ease;
}
*/

// ===============================
// COMMON PATTERNS
// ===============================

// Pattern 1: Optional callback
const handleClick = (): void => {
  if (onRatingChange) {
    onRatingChange(newRating);
  }
};

// Pattern 2: Conditional rendering
{rating > 0 && <button>Reset</button>}

// Pattern 3: Array mapping
Array.from({ length: maxStars }).map((_, index) => (
  <span key={index}>{index}</span>
))

// Pattern 4: Event type annotation
const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {};

// Pattern 5: Multiple state
const [rating, setRating] = useState<number>(0);
const [hoverRating, setHoverRating] = useState<number>(0);

// ===============================
// TESTING CHECKLIST
// ===============================

/*
Test your component:

1. Click each star (should fill)
2. Hover over stars (should show preview)
3. Leave hover area (should revert to selected rating)
4. Click reset button (should clear rating)
5. Click rating 0 (reset button should disappear)
6. Try different sizes: size="small", size="medium", size="large"
7. Try different colors: color="red", color="blue", color="green"
8. Open console, see rating logged (onRatingChange callback)
*/

// ===============================
// GIT COMMANDS FOR DAY 3
// ===============================

/*
# Create Day 3 folder
mkdir Day3-StarRating-Component
cd Day3-StarRating-Component

# Create project
npx create-react-app . --template typescript

# Build component
- Create src/components/StarRating.tsx
- Create src/components/StarRating.css
- Update src/App.tsx
- Update src/App.css

# Commit
git add .
git commit -m "Day 3: Star Rating Component - First Mini-Project"
git push origin main
*/

// ===============================
// NEXT STEPS (DAY 4)
// ===============================

/*
Day 4 will be:
React Hooks - Part 1 (Days 4-6)

Topics:
- useState (you already know this!)
- useEffect for side effects
- useContext for shared state
- Custom hooks

The Star Rating component will help you understand
how useState works in a real project!
*/
