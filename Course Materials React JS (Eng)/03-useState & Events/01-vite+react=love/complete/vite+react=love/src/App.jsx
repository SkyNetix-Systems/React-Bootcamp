import { useState } from "react";

function App() {
  // State to track the current count
  const [count, setCount] = useState(0);
  // State to track if the content is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to track which item is currently hovered
  const [activeItem, setActiveItem] = useState(null);

  // Function to toggle the open/close state
  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  // Function to set the currently hovered item
  function handleMouseEnter(item) {
    setActiveItem(item);
  }

  // Function to clear the hovered item when the mouse leaves
  function handleMouseLeave() {
    setActiveItem(null);
  }

  return (
    <>
      {isOpen ? (
        <span className="cross" onClick={toggleIsOpen}>
          &times;
        </span>
      ) : (
        <button onClick={toggleIsOpen}>Start</button>
      )}

      {isOpen && (
        <>
          <h1>Vite + React = {count >= 3 ? "Love" : ""}</h1>

          <div className="logo-container">
            <img
              onMouseEnter={() => handleMouseEnter("vite")}
              onMouseLeave={handleMouseLeave}
              src="/vite.svg"
              className={`logo ${count >= 1 || activeItem === "vite" ? "active" : ""}`}
              alt="Vite logo"
            />
            <p>+</p>
            <img
              onMouseEnter={() => handleMouseEnter("react")}
              onMouseLeave={handleMouseLeave}
              src="/react.svg"
              className={`logo ${count >= 2 || activeItem === "react" ? "active" : ""}`}
              alt="React logo"
            />
            <p>=</p>
            <img
              onMouseEnter={() => handleMouseEnter("love")}
              onMouseLeave={handleMouseLeave}
              src="/love.svg"
              className={`logo ${count >= 3 || activeItem === "love" ? "active" : ""}`}
              alt="Love logo"
            />
          </div>

          <hr />

          <div className="card">
            <p className="count-paragraph">count is {count}</p>
            <div className="increment-buttons">
              <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
              <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
              <button onClick={() => setCount(0)}>Reset</button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

// Footer component describing the technologies used in the project
function Footer() {
  return (
    <footer className="footer">
      <p>
        <strong>Technologies used:</strong> React, useState, Conditional Rendering, JSX, CSS
        Modules, Hover Effects, Event Handling, Vite.
      </p>
    </footer>
  );
}

export default App;
