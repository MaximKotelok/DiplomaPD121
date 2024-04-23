import React, { useEffect, useState } from "react";
import styles from "./CheckedBox.module.css";

export const CheckedBox = ({ text = "", onChange, value, name }) => {
    const [checked, setChecked] = useState(value);
    const handleCheckboxChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onChange(newChecked);
    };

    return (
        <div className={`d-flex  pt-2 pb-0 `} >
            <div className={`${styles["orange-checkbox-container"]}`} role="button">
                <input style={{ display: "none" }} checked={checked} type="checkbox" name={name} onChange={onChange} />
                <span
                    onClick={handleCheckboxChange}
                    className={`${styles["checkmark"]}`}
                ></span>
            </div>
            <p
                onClick={handleCheckboxChange}
            >
                {text}
            </p>
        </div>
    );
};
