import "./CardBody.css";

interface CardBodyProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CardBody = ({ title, description, imageUrl }: CardBodyProps) => {
  return (
    <div className="card-body">
      <img src={imageUrl} alt={title} className="card-image" />
      <p>{description}</p>
    </div>
  );
};

export default CardBody;
