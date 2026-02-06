import React, { useState, useRef } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);

  let clickCount = 0;

  const handleClick = () => {
    setCount((prev) => prev + 1);

    clickCount++;
  };

  console.log("Component re-rendered");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Counter Example</h1>
      <p>Current Count (useState): {count}</p>
      <p>Total Clicks (variable): {clickCount}</p>

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
