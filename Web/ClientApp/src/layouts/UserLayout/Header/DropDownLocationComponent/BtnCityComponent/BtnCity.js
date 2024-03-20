import React from "react";
import styles from "./BtnCity.module.css";
import { getCookie, setCookie } from "../../../../../utils/Cookies";

const BtnCity = ({ NameCity }) => {
  function onClick(){
    setCookie("city", NameCity);
    window.location.reload();
  }
  return (
    <div
      onClick={onClick}
      className={`${styles["btn-city"]} ${
        NameCity === getCookie("city") ? styles["btn-city-active"] : ""
      }`}
    >
      {NameCity}
    </div>
  );
};

export default BtnCity;
