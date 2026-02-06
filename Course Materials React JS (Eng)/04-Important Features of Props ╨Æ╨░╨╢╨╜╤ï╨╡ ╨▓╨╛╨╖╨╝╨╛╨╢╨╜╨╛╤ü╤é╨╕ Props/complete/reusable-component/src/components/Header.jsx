import downloadButtonFile from "../utils/downloadButtons";

export default function Header({ showInstructions, toggleInstructions }) {
  return (
    <header className="app-header">
      <h1>UI Component Library</h1>
      <p>Explore reusable and customizable components</p>
      <div className="header-buttons">
        <button className="accordion-button" onClick={toggleInstructions}>
          {showInstructions ? "Hide Instructions" : "Show Instructions"}
        </button>
        <button onClick={downloadButtonFile} className="download-button">
          Download Button.js
        </button>
      </div>
    </header>
  );
}
