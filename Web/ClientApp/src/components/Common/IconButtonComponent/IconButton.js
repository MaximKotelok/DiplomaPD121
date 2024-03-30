import React from "react";
import styles from "./IconButton.module.css";

const IconButton = ({ iconPath, text, onClick }) => {
  return (
    <button
      className={`btn d-flex ${styles["btn-style-hover"]} align-items-center`}
    >
      <img
        src={iconPath}
        alt="Icon"
        className="mr-2"
        style={{ width: "28px", height: "28px", marginRight: "8px" }}
      />
      {text && <span className="text-center flex-grow-1">{text}</span>}
    </button>
  );
};

export default IconButton;
