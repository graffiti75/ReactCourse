import "./App.css";
import Card from "./Card";
import CardWithActions from "./CardWithActionsProps";

function App() {
  const handleCardClick = (): void => {
    console.log("Card button clicked!");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Card Component Library 🎨</h1>
        <p>Day 4: Components, Props & Event Handling</p>
      </header>
      <main className="card-grid">
        <Card
          title="Bear"
          description="Description"
          imageUrl="https://picsum.photos/400/250?random=1"
          onButtonClick={handleCardClick}
        />
        <Card
          title="React Basics"
          description="Learn the fundamentals of React including components, props, and state management."
          imageUrl="https://picsum.photos/400/250?random=2"
          buttonText="Learn More"
          onButtonClick={handleCardClick}
          variant="default"
        />
        <Card
          title="TypeScript"
          description="Master TypeScript to write type-safe React applications with confidence."
          imageUrl="https://picsum.photos/400/250?random=3"
          buttonText="Get Started"
          onButtonClick={() => alert("Starting TypeScript!")}
          variant="success"
        />
        <Card
          title="Advanced Patterns"
          description="Deep dive into advanced React patterns and best practices."
          imageUrl="https://picsum.photos/400/250?random=4"
          variant="danger"
        />
        <CardWithActions
          title="Card"
          description="Description"
          imageUrl="https://picsum.photos/400/250?random=5"
          actions={[
            { label: "Edit", handler: () => console.log("Edit") },
            { label: "Delete", handler: () => console.log("Delete") },
          ]}
        />
      </main>
    </div>
  );
}

export default App;
