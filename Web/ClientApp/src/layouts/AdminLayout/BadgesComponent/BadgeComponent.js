import React from "react";
import "./Badge.css";

import { ReactComponent as Bell } from "./bell.svg";

const BadgeComponent = ({ badgeText = "1" }) => {
  return (
    <div className="position-relative">
      <Bell />

      <span
        className="position-absolute  translate-middle badge rounded-pill bg-danger text-badge"
        style={{ top: "8px", left: "26px" }}
      >
        {badgeText}
        <span className="visually-hidden">{badgeText}</span>
      </span>
    </div>
  );
};

export default BadgeComponent;
