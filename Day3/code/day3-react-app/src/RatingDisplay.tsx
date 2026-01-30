import "./StarRating.css";

// Define props interface
interface RatingDisplayProps {
  getFeedbackMessage: (currentRating: number) => string;
  rating: number;
  maxStars: number;
  handleReset: () => void;
}

const RatingDisplay = ({
  getFeedbackMessage,
  rating = 0,
  maxStars = 5,
  handleReset,
}: RatingDisplayProps) => {
  return (
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
  );
};

export default RatingDisplay;
