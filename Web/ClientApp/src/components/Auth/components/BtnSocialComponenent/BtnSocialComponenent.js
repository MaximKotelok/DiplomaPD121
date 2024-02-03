import React from "react";
import styles from "./BtnSocila.module.css";

const BtnSocialComponenent = ({ icon, text }) => {
  return (
    <div className={`${styles["btn-socal"]} mb-3`}>
      <img  className={`${styles["icon-container-socal"]}`}  src={icon} />
      <div>{text}</div>
    </div>
  );
};

export default BtnSocialComponenent;
