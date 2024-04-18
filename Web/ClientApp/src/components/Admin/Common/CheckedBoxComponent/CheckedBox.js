import React, { useState } from "react";
import styles from "./CheckedBox.module.css";

export const CheckedBox = ({ text = "", onChange = null }) => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };
  return (
    <div className={`d-flex  pt-2 pb-0 `} >
      <div className={`${styles["orange-checkbox-container"]}`} role="button">
        <input style={{ display: "none" }} checked={checked} type="checkbox" onChange={()=>{}}/>
        <span
          onClick={handleCheckboxChange}
          // onClick={() => setChecked(!checked)}
          className={`${styles["checkmark"]}`}
        ></span>
      </div>
      <p
        // onClick={() => setChecked(!checked)}
        onClick={handleCheckboxChange}
      >
        {text}
      </p>
    </div>
  );
};
