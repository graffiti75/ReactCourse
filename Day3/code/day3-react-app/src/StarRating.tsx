import { useState } from "react";
import "./StarRating.css";

// Define props interface
interface StarRatingProps {
  maxStars?: number; // Default: 5
  onRatingChange?: (rating: number) => void;
  initialRating?: number; // Default: 0
  size?: "small" | "medium" | "large"; // Default: medium
  color?: string; // Challenge 1
}

const StarRating = ({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = "medium",
  color = "#ffd700",
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
    console.log({ starNumber, currentRating });

    if (starNumber <= currentRating) {
      return "filled";
    } else {
      return "empty";
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
            {getStarType(index) === "filled" ? "★" : "☆"}
          </span>
        ))}
      </div>

      <div className="rating-display">
        {/* Challenge 2: Add feedback message */}
        <p className="feedback-message">{getFeedbackMessage(rating)}</p>

        <p className="rating-text">
          Rating: <span className="rating-number">{rating}</span> / {maxStars}
        </p>

        {rating > 0 && (
          <button onClick={handleReset} className="reset-button">
            Reset Rating
          </button>
        )}
      </div>
    </div>
  );
};

export default StarRating;
