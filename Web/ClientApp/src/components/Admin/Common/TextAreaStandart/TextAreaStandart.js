import React from "react";
import styles from "./TextAreaStandart.module.css";

export const TextAreaStandart = ({ label, placholder, onChange, rows = 4, value, name }) => {
    return (
        <div className="mb-1">
            <label>{label}</label>
            <textarea
                className={`${styles["text-area-zayavka"]}`}
                placeholder={placholder}
                type="text"
                onChange={(e) => { onChange(e) }}
                rows={rows}
                value={value}
                name={name}
            />
        </div>
    );
};
