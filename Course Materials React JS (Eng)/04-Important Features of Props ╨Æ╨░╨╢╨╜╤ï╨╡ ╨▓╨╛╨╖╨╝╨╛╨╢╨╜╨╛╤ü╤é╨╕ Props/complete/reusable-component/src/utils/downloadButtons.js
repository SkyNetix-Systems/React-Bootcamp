export default function downloadButtonFile() {
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
}
