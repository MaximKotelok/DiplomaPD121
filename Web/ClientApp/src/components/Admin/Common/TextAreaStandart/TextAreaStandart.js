import React from "react";
import styles from "./TextAreaStandart.module.css";

export const TextAreaStandart = ({ label, placholder, onChang, rows = 4 }) => {
  return (
    <div className="mb-1">
      <label>{label}</label>
      <textarea
        className={`${styles["text-area-zayavka"]}`}
        placeholder={placholder}
        type="text"
        rows={rows}
        name=""
      />
    </div>
  );
};
