import "./Card.css";
import "./CardHeader.css";
import "./CardBody.css";
import "./CardFooter.css";

interface CardWithActionsProps {
  title: string;
  description: string;
  imageUrl: string;
  actions?: Array<{
    label: string;
    handler: () => void;
  }>;
}

const CardWithActions = ({
  title,
  description,
  imageUrl,
  actions,
}: CardWithActionsProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <img src={imageUrl} alt={title} className="card-image" />
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {actions &&
          actions.map((action, index) => (
            <button
              key={index}
              onClick={action.handler}
              className="card-button"
            >
              {action.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CardWithActions;
