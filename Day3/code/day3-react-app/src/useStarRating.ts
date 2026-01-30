import { useState } from "react";

interface UseStarRatingProps {
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

interface UseStarRatingReturn {
  rating: number;
  handleStarClick: (starIndex: number) => void;
  handleStarHover: (starIndex: number) => void;
  handleLeave: () => void;
  handleReset: () => void;
  getStarType: (starIndex: number) => string;
  getFeedbackMessage: (currentRating: number) => string;
}

export const useStarRating = ({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}: UseStarRatingProps): UseStarRatingReturn => {
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
    console.log({ starNumber, currentRating });

    if (starNumber <= currentRating) {
      return "filled";
    } else {
      return "empty";
    }
  };

  const getFeedbackMessage = (currentRating: number): string => {
    if (currentRating === 0) return "Click to rate!";
    if (currentRating <= 2) return "Poor";
    if (currentRating === 3) return "Good";
    if (currentRating === 4) return "Very Good";
    return "Excellent!";
  };

  return {
    rating,
    handleStarClick,
    handleStarHover,
    handleLeave,
    handleReset,
    getStarType,
    getFeedbackMessage,
  };
};
