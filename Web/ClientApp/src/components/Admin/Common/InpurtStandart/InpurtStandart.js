import React from "react";
import styles from "./InpurtStandart.module.css";

export const InpurtStandart = ({ label, placholder, onChange, className, value, name }) => {
    return (
        <div className={`flex-grow-1 mb-1 ${className}`}>
            <label className={`${styles["label-style"]}`}>{label}</label>
            <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder={placholder}
                onChange={(e) => { onChange(e) }}
                value={value}
                type="text"
                name={name}
            />
        </div>
    );
};
