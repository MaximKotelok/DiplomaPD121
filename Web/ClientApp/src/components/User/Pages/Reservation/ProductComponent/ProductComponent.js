import React from "react";
import Photo from "../../../../../assets/images/download.jpg";
import styles from "./ProductComponent.module.css";
const ProductComponent = () => {
  return (
    <div className={`d-flex mb-4 `} style={{ height: "92px" }}>
      <img
        src={Photo}
        style={{ width: "92px", height: "92px", objectFit: "cover" }}
      />
      <div className={`ms-4 w-100 d-flex justify-content-between flex-column`}>
        <h5 className={`${styles["text-title"]}`}>Діазолін-Дарниця </h5>
        <h6 className={`${styles["text-linyika"]}`}>Діазолін Дарниця</h6>
        <div className={` d-flex justify-content-between`}>
          <p className={`${styles["text-sum-count"]}`}>1 упаковка</p>{" "}
          <p
            className={`${styles["text-sum-count"]}`}
            style={{ fontWeight: "700" }}
          >
            403.20{" "}
            <span style={{ fontSize: "12px", fontWeight: "500" }}>грн</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductComponent;
