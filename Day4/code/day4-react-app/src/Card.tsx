import "./Card.css";
import "./CardFooter.css";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: "default" | "success" | "danger"; // Optional: card style
}

const handleClick = (): void => {
  console.log("Card button clicked!");
};

const Card = ({
  title,
  description,
  imageUrl,
  buttonText = "Learn More",
  onButtonClick,
  variant = "default",
}: CardProps) => {
  return (
    <div className={`card card-${variant}`}>
      <CardHeader title={title} closeButton={true} />
      <CardBody title={title} description={description} imageUrl={imageUrl} />
      <CardFooter onButtonClick={handleClick} />
    </div>
  );
};

export default Card;
