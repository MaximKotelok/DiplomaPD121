import React, { useState } from "react";
import styles from "./CheckedBox.module.css";

export const CheckedBox = ({ text = "", checked, setChecked }) => {

  return (
    <div className={`d-flex  pt-2 pb-0 `} >
      <div className={`${styles["orange-checkbox-container"]}`} role="button">
        <input style={{ display: "none" }} checked={checked} type="checkbox" onChange={()=>{}}/>
        <span
          onClick={() => setChecked(!checked)}
          className={`${styles["checkmark"]}`}
        ></span>
      </div>
      <p onClick={() => setChecked(!checked)}>{text}</p>
    </div>
  );
};
