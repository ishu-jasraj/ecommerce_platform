import React, { useState, useMemo } from "react";

const ExpensiveCalculation = ({ num }) => {
  const computeFactorial = (n) => {
    console.log("Computing factorial...");
    return n <= 1 ? 1 : n * computeFactorial(n - 1);
  };

  const factorial = useMemo(() => computeFactorial(num), [num]);

  return <p>Factorial of {num} is {factorial}</p>;
};

const Memo = () => {
  const [number, setNumber] = useState(5);
  const [count, setCount] = useState(0);

  return (
    <div>
      <ExpensiveCalculation num={number} />
      <button onClick={() => setNumber(number + 1)}>Increase Number</button>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
    </div>
  );
};

export default Memo;
