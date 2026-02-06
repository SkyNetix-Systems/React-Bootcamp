import { useState } from "react";
import "./index.css";

const downloadButtonFile = () => {
  const code = `
import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function Button({
children,
size = "medium",
variant = "primary",
isDisabled = false,
onClick,
fullWidth = false,
}) {
return (
  <button
    className={\`button \${size} \${variant} \${fullWidth ? "full-width" : ""} \${isDisabled ? "disabled" : ""}\`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);
}

Button.propTypes = {
children: PropTypes.node.isRequired,
size: PropTypes.oneOf(["small", "medium", "large"]),
variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline", "gradient"]),
isDisabled: PropTypes.bool,
onClick: PropTypes.func,
fullWidth: PropTypes.bool,
};

export default Button;
  `;

  const blob = new Blob([code], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Button.js";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="app">
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

      <div className={`app-instructions ${showInstructions ? "open" : ""}`}>
        <h3>How to Use</h3>
        <p>To use these components in your project:</p>
        <ol>
          <li>
            Import the component: <code>{`import Button from './Button';`}</code>
          </li>
          <li>Customize the component using the following props:</li>
        </ol>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>node</td>
              <td>
                <code>required</code>
              </td>
              <td>Content displayed inside the button (text, icons, etc.).</td>
            </tr>
            <tr>
              <td>
                <code>size</code>
              </td>
              <td>string</td>
              <td>
                <code>&quot;medium&quot;</code>
              </td>
              <td>
                Size of the button: <code>&quot;small&quot;</code>, <code>&quot;medium&quot;</code>,
                or <code>&quot;large&quot;</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>variant</code>
              </td>
              <td>string</td>
              <td>
                <code>&quot;primary&quot;</code>
              </td>
              <td>
                Style of the button: <code>&quot;primary&quot;</code>,{" "}
                <code>&quot;secondary&quot;</code>, <code>&quot;danger&quot;</code>,{" "}
                <code>&quot;outline&quot;</code>, or <code>&quot;gradient&quot;</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>isDisabled</code>
              </td>
              <td>boolean</td>
              <td>
                <code>false</code>
              </td>
              <td>
                Disables the button if set to <code>true</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>fullWidth</code>
              </td>
              <td>boolean</td>
              <td>
                <code>false</code>
              </td>
              <td>
                Makes the button stretch to fill its container if set to <code>true</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>onClick</code>
              </td>
              <td>function</td>
              <td>
                <code>null</code>
              </td>
              <td>Callback function triggered when the button is clicked.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Example usage: <code>{`<Button size="large" variant="gradient">Click Me</Button>`}</code>
        </p>
      </div>

      <main className="component-showcase">
        <section className="component-group">
          <h2>Variants</h2>
          <div className="component-card">
            <button className="button primary">Primary</button>
            <button className="button secondary">Secondary</button>
            <button className="button danger">Danger</button>
            <button className="button gradient">Gradient</button>
            <button className="button outline">Outline</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Sizes</h2>
          <div className="component-card">
            <button className="button small primary">Small</button>
            <button className="button medium primary">Medium</button>
            <button className="button large primary">Large</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Button States</h2>
          <div className="component-card">
            <button className="button primary">Default</button>
            <button className="button primary disabled">Disabled</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Full Width Button</h2>
          <div className="component-card">
            <button className="button secondary full-width">Full Width</button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 UI Component Library. All rights reserved.</p>
        <div className="technologies-used">
          <strong>Technologies used:</strong> React, JSX, useState, Conditional Rendering, CSS
          Modules, Event Handling, Component Composition, Reusable Components.
        </div>
      </footer>
    </div>
  );
}

export default App;
