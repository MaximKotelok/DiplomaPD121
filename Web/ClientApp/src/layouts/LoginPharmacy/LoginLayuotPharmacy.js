import React from "react";
import styles from "./LoginLayuotPharmacy.module.css";
import { BtnRol } from "./components/BtnRolComponent/BtnRol";
import { FormaLogin } from "./components/FormaLoginComponent/FormaLogin";

export const LoginLayuotPharmacy = () => {
  return (
    <div
      className={` row ${styles["conteiner-osnov"]}`}
      style={{ height: "100vh", margin: "0" }}
    >
      <div className={`col-4  `}>
        <FormaLogin />
        {/* <BtnRol /> */}
      </div>
      <div className={`col-8  `}>
        <div className={`${styles["div-osnova"]} `}></div>
      </div>
    </div>
  );
};
