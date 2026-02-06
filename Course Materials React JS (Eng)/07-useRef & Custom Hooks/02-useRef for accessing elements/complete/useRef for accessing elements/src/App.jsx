import React, { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef(null); // Create a ref to reference the input element

  useEffect(() => {
    // Automatically runs after the component is mounted

    // Alternative way to access the element (not recommended in React)
    // const el = document.querySelector(".input");
    // console.log(el);
    // el.focus(); // Sets focus using plain DOM API

    console.log(inputRef.current); // Logs the input element accessed through useRef
    inputRef.current.focus(); // Sets focus on the input field when the component mounts
  }, []); // Empty dependency array ensures this runs only once after the initial render

  function handleFocus() {
    // Event handler to set focus on the input field
    inputRef.current.focus(); // Accesses the input element and sets focus
  }

  return (
    <div>
      {/* Input field with the ref attached for direct DOM access */}
      <input ref={inputRef} type="text" placeholder="Type something..." className="input" />
      {/* Button to trigger the focus handler */}
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default App;
