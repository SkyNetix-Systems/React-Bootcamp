import PropTypes from "prop-types";

// Button Component: A reusable UI button component
export default function Button({
  size = "medium", // Default button size
  variant = "primary", // Default button style (variant)
  fullWidth = false, // Determines if the button should stretch to fill its container
  isDisabled = false, // Determines if the button is disabled
  onClick, // Function triggered when the button is clicked
  children, // Content (text or elements) inside the button
}) {
  return (
    <button
      // Dynamically set the button's className based on props
      className={`button ${variant} ${size} ${isDisabled ? "disabled" : ""} ${
        fullWidth ? "full-width" : ""
      }`}
      onClick={onClick} // Attach the onClick handler
    >
      {children} {/* Render children inside the button */}
    </button>
  );
}

// Define the types and requirements for the Button component's props
Button.propTypes = {
  text: PropTypes.string.isRequired, // The text displayed in the button (required)
  icon: PropTypes.string, // An optional icon to display inside the button
  size: PropTypes.oneOf(["small", "medium", "large"]), // Size of the button (must be one of the predefined options)
  variant: PropTypes.string, // The visual style of the button (e.g., primary, secondary)
  fullWidth: PropTypes.bool, // Boolean to make the button stretch to its container
  isDisabled: PropTypes.bool, // Boolean to disable the button
  onClick: PropTypes.func, // Function to handle button click events
};

// Button.defaultProps = {
//   text: "Default Text", // Example of a default value for text (if uncommented)
// };
