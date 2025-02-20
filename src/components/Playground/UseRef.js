import { useRef, useState, useEffect } from "react";

// function UseRef() {
//   const renderCount = useRef(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     renderCount.current += 1;
//   });

//   return (
//     <div>
//       <p>Button Clicked: {count} times</p>
//       <p>Component Rendered: {renderCount.current} times</p>
//       <button onClick={() => setCount(count + 1)}>Click Me</button>
//       <p>{Math.random()}</p>
//     </div>
//   );
// }


function UseRef() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; // Store previous value
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// export default PreviousValueTracker;


export default UseRef;