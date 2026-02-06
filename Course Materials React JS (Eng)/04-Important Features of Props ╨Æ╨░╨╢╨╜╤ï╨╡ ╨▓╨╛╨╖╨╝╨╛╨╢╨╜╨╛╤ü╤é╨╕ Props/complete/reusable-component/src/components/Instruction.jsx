export default function Instruction({ showInstructions }) {
  return (
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
  );
}
