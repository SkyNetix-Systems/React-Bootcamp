import React, { useState, useRef } from "react";

function CounterApp() {
  // useState hook to manage the state of the counter, triggers a re-render on update
  const [count, setCount] = useState(0);

  // A simple variable to track click count, resets on each render
  let clickCount = 0;

  // useRef hook to store a persistent value between renders
  const clickRef = useRef(0);

  // Log the current state of clickRef (an object with a `current` property)
  console.log(clickRef);

  // Function to handle button clicks
  const handleClick = () => {
    // Increment the state counter, causing a re-render
    setCount((prev) => prev + 1);

    // Increment the simple variable (resets after each re-render)
    clickCount++;

    // Increment the value stored in useRef (persists between renders)
    clickRef.current++;
  };

  // Log to indicate the component has re-rendered
  console.log("Component re-rendered");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Counter Example</h1>

      {/* Display the state-managed count */}
      <p>Current Count (useState): {count}</p>

      {/* Display the value of the simple variable (resets each render) */}
      <p>Total Clicks (variable): {clickCount}</p>

      {/* Display the value of useRef (persists between renders) */}
      <p>Total Clicks (useRef): {clickRef.current}</p>

      {/* Button to trigger the click handler */}
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Increment
      </button>
    </div>
  );
}

export default CounterApp;
