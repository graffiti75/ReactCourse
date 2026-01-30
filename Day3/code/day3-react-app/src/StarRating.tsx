import "./StarRating.css";
import StarsRow from "./StarsRow";
import RatingDisplay from "./RatingDisplay";
import { useStarRating } from "./useStarRating";

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
  const {
    rating,
    handleStarClick,
    handleStarHover,
    handleLeave,
    handleReset,
    getStarType,
    getFeedbackMessage,
  } = useStarRating({
    maxStars,
    initialRating,
    onRatingChange,
  });

  return (
    <div className={`star-rating-container size-${size}`}>
      <StarsRow
        maxStars={maxStars}
        getStarType={getStarType}
        handleStarClick={handleStarClick}
        handleStarHover={handleStarHover}
        handleLeave={handleLeave}
        color={color}
      />
      <RatingDisplay
        getFeedbackMessage={getFeedbackMessage}
        rating={rating}
        maxStars={maxStars}
        handleReset={handleReset}
      />
    </div>
  );
};

export default StarRating;
