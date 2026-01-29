import { JSX } from "react";
import StarRating from "./StarRating";
import "./App.css";

function App(): JSX.Element {
  // Handle rating change
  const handleRatingChange = (rating: number): void => {
    console.log(`User rated: ${rating} stars`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Rating Component 🌟</h1>
        <p>Day 3: Interactive Component Mini-Project</p>
      </header>

      <main>
        <StarRating
          maxStars={5}
          size="medium"
          onRatingChange={handleRatingChange}
          color="#ffd700"
        />
      </main>
    </div>
  );
}

export default App;
