import React from "react";
import styles from "./AdditionalDivRadio.module.css";
import { BtnRadioSelectedProduct } from "../../../../../Common/BtnRadioSelectedProductComponent/BtnRadioSelectedProduct";



export const AdditionalDivRadio = ({
  title = "Смак",
  idRadio = 0,
  nameRadio = "smak",
}) => {
  return (
    <div>
      <h6 className={`${styles["text-header"]}`}>{title}:</h6>
      <div className="d-flex flex-wrap">
        <BtnRadioSelectedProduct text="Банан" nameRadio="option1" idRadio={"1"} />
        <BtnRadioSelectedProduct text="Шоколад" nameRadio="option1" idRadio={"2"} />
        <BtnRadioSelectedProduct text="М'ята" nameRadio="option1" idRadio={"3"} />
      </div>
    </div>
  );
};
