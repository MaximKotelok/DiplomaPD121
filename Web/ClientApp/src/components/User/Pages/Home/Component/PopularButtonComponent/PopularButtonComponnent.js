import React, { useState } from "react";
import styles from "./PopularButton.module.css"; // Створіть CSS файл для стилізації компонента

const PopularButtonComponnent = ({ text, onClick }) => {
  return (
      <div className={`${styles["container-component"]}`} onClick={onClick}>
      <div className={`${styles["inner-text"]}`}>{text}</div>
    </div>
  );
};

export default PopularButtonComponnent;
