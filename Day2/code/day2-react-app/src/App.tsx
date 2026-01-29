import { JSX, useState } from "react";
import { ChangeEvent } from "react";
import "./App.css";
import { Button } from "./Button";
import { useCounter } from "./useCounter";
import { CounterDisplay } from "./CounterDisplay";

function App(): JSX.Element {
  // State with types
  const [step, setStep] = useState<number>(1);
  const { count, increment, decrement, reset, history } = useCounter(0);

  const handleStepChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setStep(Number(event.target.value));
  };

  // Conditional styling
  const countColor: string =
    count > 10 ? "blue" : count < -10 ? "red" : "black";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React! 🚀</h1>
        <p>Day 2: TypeScript Counter App</p>
      </header>

      <main className="counter-section">
        <div className="counter">
          <CounterDisplay count={count} color={countColor} label="Count" />
          <div className="button-group">
            <Button label="Increment" onClick={increment} />
            <Button label="Decrement" onClick={decrement} />
            <Button label="Reset" onClick={reset} />
          </div>
        </div>

        <div className="step-control">
          <label htmlFor="step-input">Step Amount: </label>
          <input
            id="step-input"
            type="number"
            value={step}
            min="1"
            max="100"
            onChange={handleStepChange}
          />
        </div>

        {history.length > 1 && (
          <div className="history">
            <h3>History</h3>
            <p className="history-display">{history.join(" → ")}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
