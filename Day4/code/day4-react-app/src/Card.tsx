import "./Card.css";
import "./CardFooter.css";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

const Card = () => {
  return (
    <div className="card">
      <CardHeader title="Card Title" closeButton={true} />
      <CardBody>
        <p>Body content goes here</p>
      </CardBody>
      <CardFooter>
        <button className="button">Click Me</button>
        <button className="button">Click Me</button>
      </CardFooter>
    </div>
  );
};

export default Card;
