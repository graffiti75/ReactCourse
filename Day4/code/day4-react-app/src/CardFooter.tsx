import "./CardFooter.css";

interface CardFooterProps {
  onButtonClick?: () => void;
  buttonText?: string;
  buttonDisabled?: boolean;
}

const CardFooter = ({
  onButtonClick,
  buttonText = "Learn More",
  buttonDisabled = true,
}: CardFooterProps) => {
  return (
    <div className="card-footer">
      {onButtonClick && (
        <button
          onClick={onButtonClick}
          className="card-button"
          disabled={buttonDisabled}
          style={{
            opacity: buttonDisabled ? 0.5 : 1,
            cursor: buttonDisabled ? "not-allowed" : "pointer",
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default CardFooter;
