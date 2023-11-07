import React from "react";
import logoImage from "../../img/fullstack_logo.png"; // Use an import statement and correct the relative path

const Logo = () => {
  return (
    <div className="logo-container">
      <img
        src={logoImage}
        alt="Your Logo"
        style={{ maxWidth: "200px", height: "auto", marginTop: "10px" }}
      />
    </div>
  );
};

export default Logo;
