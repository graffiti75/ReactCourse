import "./CardFooter.css";

interface CardFooterProps {
  onButtonClick?: () => void;
  buttonText?: string;
}

const CardFooter = ({
  onButtonClick,
  buttonText = "Learn More",
}: CardFooterProps) => {
  return (
    <div className="card-footer">
      {onButtonClick && (
        <button onClick={onButtonClick} className="card-button">
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default CardFooter;
