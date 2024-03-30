import React from "react";
import styles from "./BtnRadioSelectedProduct.module.css";
import "./BtnRadioSelectedProduct.css";

export const BtnRadioSelectedProduct = ({
  idRadio,
  nameRadio = "standart",
  text ="Radio"
}) => {
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name={nameRadio}
        id={idRadio}
        autoComplete="off"
      />
      <label className={`btn  ${styles["my-btn"]}`} htmlFor={idRadio}>
        {text}
      </label>
    </div>
  );
};
