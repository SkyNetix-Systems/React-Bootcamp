function App() {
  return (
    <>
      {/* <span className="cross">&times;</span> */}
      {/* <button>Начать</button> */}

      <h1>Vite + React = Love</h1>

      {/* <div className="logo-container">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <p>+</p>
        <img src="/react.svg" className="logo" alt="React logo" />
        <p>=</p>
        <img src="/love.svg" className="logo" alt="Love logo" />
      </div> */}

      <hr />

      <div className="card">
        <p className="count-paragraph">count is 0</p>
        <div className="increment-buttons">
          <button>+1</button>
          <button>-1</button>
          <button>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
