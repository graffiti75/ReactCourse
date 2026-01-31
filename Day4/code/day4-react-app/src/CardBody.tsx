import "./App.css";

interface CardBodyProps {
  children: React.ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
  return (
    <div className="card-body">
      <p>Card Body</p>
      {children}
    </div>
  );
};

export default CardBody;
