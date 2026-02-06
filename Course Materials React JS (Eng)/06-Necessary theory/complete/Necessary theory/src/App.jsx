import { useState } from "react";

export default function App() {
  console.log("RENDER");
  const [number, setNumber] = useState(0);

  function increaseNumByThree() {
    setNumber((number) => number + 1);
    console.log(number); // Still 0, but the page shows 3 after re-render
    setNumber((number) => number + 1);
    setNumber((number) => number + 1);
  }

  return (
    <div>
      <p style={{ fontSize: "24px" }}>{number}</p>
      <button style={{ padding: "8px" }} onClick={increaseNumByThree}>
        Increase by 3
      </button>
    </div>
  );
}
