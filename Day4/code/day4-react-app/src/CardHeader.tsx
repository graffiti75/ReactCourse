import "./CardHeader.css";

interface CardHeaderProps {
  title?: string;
  closeButton?: boolean;
}

const CardHeader = ({ title = "Title", closeButton }: CardHeaderProps) => {
  return (
    <div className="card-header">
      <h2>{title}</h2>
      {closeButton && <button className="close-button">X</button>}
    </div>
  );
};

export default CardHeader;
