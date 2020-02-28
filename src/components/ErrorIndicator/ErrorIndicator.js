import React from "react";

import icon from "./error.png";
import "./ErrorIndicator.css";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error" />
      <span className="sorry">Sorry</span>
      <span>Something went wrong</span>
      <span>We'll fix it ASAP</span>
    </div>
  );
};

export default ErrorIndicator;
