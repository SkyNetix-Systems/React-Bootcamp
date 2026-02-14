import React from "react";

const Footer = () => {
  const footerStyle = {
    position: "relative", // Takes the footer out of normal document flow and positions it relative to the nearest positioned parent (or the page)
    top: "10vh", // Pushes the footer down by 100% of the viewport height (basically places it below the first screen)
    width: "100%", // Makes the footer span the full width of the page
    textAlign: "center", // Centers the text horizontally inside the footer
  };
  return (
    <div className="bg-dark text-light" style={footerStyle}>
      SKYNETIX SYSTEMS LLP. All rights reserved.
    </div>
  );
};

export default Footer;
