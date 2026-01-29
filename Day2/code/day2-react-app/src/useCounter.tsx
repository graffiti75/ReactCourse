import { useState } from "react";

//=========================
// CHALLENGE 2: CUSTOM HOOK WITH TYPES
//=========================

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  history: number[];
}

export const useCounter = (
  initialValue: number = 0,
  step: number = 1,
): UseCounterReturn => {
  const [count, setCount] = useState<number>(initialValue);
  const [history, setHistory] = useState<number[]>([0]);

  const increment = (): void => {
    const newCount = count + step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const decrement = (): void => {
    const newCount = count - step;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const reset = (): void => {
    setCount(initialValue);
    setHistory([0]);
  };

  return { count, increment, decrement, reset, history };
};
