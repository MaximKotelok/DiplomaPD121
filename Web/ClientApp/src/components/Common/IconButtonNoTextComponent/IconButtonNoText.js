import React from "react";
// import styles from "./IconButton.module.css";

export const IconButtonNoText = ({ iconPath, onClick }) => {
  return (
    <button className={`btn d-flex  align-items-center`}>
      <img
        src={iconPath}
        alt="Icon"
        style={{ width: "28px", height: "28px", marginRight: "8px" }}
      />
    </button>
  );
};
