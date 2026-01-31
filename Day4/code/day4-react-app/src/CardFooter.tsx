import "./App.css";

interface CardFooterProps {
  children: React.ReactNode;
}

const CardFooter = ({ children }: CardFooterProps) => {
  return <div className="card-footer">{children}</div>;
};

export default CardFooter;
