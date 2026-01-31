import "./App.css";
import Card from "./Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the Card</p>
      </header>
      <main className="App-main">
        {Array.from({ length: 1 }).map((_, index) => (
          <Card key={index} />
        ))}
      </main>
      <footer className="App-footer">
        <p>Footer content goes here</p>
      </footer>
    </div>
  );
}

export default App;
