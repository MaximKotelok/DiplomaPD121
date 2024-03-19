import React from "react";
import styles from "./BtnCity.module.css";

const BtnCity = ({ NameCity }) => {
  return (
    <div
      className={`${styles["btn-city"]} ${
        NameCity === "Львів" ? styles["btn-city-active"] : ""
      }`}
    >
      {NameCity}
    </div>
  );
};

export default BtnCity;
