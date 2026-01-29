import { JSX } from "react";

//=========================
// CHALLENGE 3: TYPED COMPONENT WITH PROPS
//=========================

interface CounterDisplayProps {
  count: number;
  color: string;
  label?: string;
}

export const CounterDisplay = ({
  count,
  color,
  label = "Count",
}: CounterDisplayProps): JSX.Element => {
  return (
    <p style={{ color, fontSize: "32px", fontWeight: "bold" }}>
      {label}: {count}
    </p>
  );
};
