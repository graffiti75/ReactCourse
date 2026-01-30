import "./StarRating.css";

// Define props interface
interface StarsProps {
  maxStars?: number; // Default: 5
  getStarType: (starIndex: number) => string;
  handleStarClick: (starIndex: number) => void;
  handleStarHover: (starIndex: number) => void;
  handleLeave: () => void;
  color?: string; // Challenge 1
}

const StarsRow = ({
  maxStars = 5,
  getStarType,
  handleStarClick,
  handleStarHover,
  handleLeave,
  color = "#ffd700",
}: StarsProps) => {
  return (
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
  );
};

export default StarsRow;
