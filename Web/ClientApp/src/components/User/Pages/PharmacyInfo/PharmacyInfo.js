import React from "react";
import CategoryPathDetailsComponent from "../Details/Component/CategoryPathDetailsComponent/CategoryPathDetailsComponent";
import styles from "./PharmacyInfo.module.css";
import { ReactComponent as Save } from "./Vector.svg";
const PharmacyInfo = () => {
  return (
    <div>
      {/* <CategoryPathDetailsComponent data={product.pathToCategory} /> */}
      {/* <CategoryPathDetailsComponent /> */}
<p className={` ${styles["path-text"]} `}>Аптеки   |    Інформація про аптеку</p>
      <div className="row" style={{ marginBottom: "80px" }}>
        <div className="col-12 col-md-8">
          <h4 className={`${styles["title-pharnacy"]}`}>
            Аптека Здорова Родина
          </h4>
          <p className={`${styles["text-opus"]}`}>Відкрито до 20:00</p>
          <p className={`${styles["text-opus"]}`}>
            вул. Володимира Великого 29А, Львів
          </p>
          <p className={`${styles["text-opus"]}`}>
            Очікуваний час підтвердження броні{" "}
            <span className={`${styles["oclock-style"]}`}>17:00</span>
          </p>
          <div className={` d-flex `}>
            <button
              className={`brn-form ${styles["btn-style"]} ${styles["btn-prosta"]} `}
            >
              Аптеки Здорова Родина у Льовові
            </button>
            <button 
              className={`brn-form ${styles["btn-style"]} ${styles["btn-img"]} `}
            >
              <Save />{" "}
              <span style={{ marginLeft: "8px" }}>Зберегти в мої аптеки</span>
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4">2</div>
      </div>
    </div>
  );
};

export default PharmacyInfo;
