import { useState } from "react";

const App = () => {
  // const [count, setCount] = useState(0);
  // const increment = () => setCount((prev) => prev + 1);

  return (
    <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>
      <h1>Example of Context API</h1>
      <ChildComponent count={count} increment={increment} />
    </div>
  );
};

const ChildComponent = ({ count, increment }) => {
  return (
    <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
      <h2>Child Component</h2>
      <NestedChildComponent count={count} increment={increment} />
    </div>
  );
};

const NestedChildComponent = ({ count, increment }) => {
  return (
    <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
      <h3>Nested Component</h3>
      {/* <p>Counter value: {count}</p>
      <button onClick={increment}>Increase</button> */}
    </div>
  );
};

export default App;
