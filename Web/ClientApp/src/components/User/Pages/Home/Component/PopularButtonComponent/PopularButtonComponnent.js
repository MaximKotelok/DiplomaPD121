import React, { useState } from "react";
import styles from "./PopularButton.module.css"; // Створіть CSS файл для стилізації компонента

const PopularButtonComponnent = ({ text, onClick, className }) => {
  return (
      <div className={`${styles["container-component"]} ${className}`} onClick={onClick}>
      <div className={`${styles["inner-text"]}`}>{text}</div>
    </div>
  );
};

export default PopularButtonComponnent;
