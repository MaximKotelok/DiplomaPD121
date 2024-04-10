import React from "react";
import styles from "./ProductDetailsAdminComponents.module.css";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { TableDetials } from "./component/TableDetials";
import { AcordeonDetailsHistory } from "./component/AcordeonTablle/AcordeonDetailsHistory";

export const ProductDetailsAdminComponents = () => {
  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="d-flex ">
          <CustomImgComponent
            className={`${styles["img-product"]}`}
            //   src={`${ApiPath}${item.pathToPhoto}`}
          />
          <div className=" ms-3 d-flex flex-column  align-content-between">
            <h5 className={` ${styles["text-header"]}`}>
              Протеїн Optimum Nutrition Whey Gold Standard
            </h5>
            <p className={` mt-auto ${styles["text-price"]}`}>
              від <span>3099.30</span> до <span>3400.20</span> грн
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`col-6 `}>
            <h5 className={`${styles["head-tablle-text"]}`}>Короткий опис</h5>
            <TableDetials />
          </div>
          <div className={`col-6 `}>
            <h5 className={`${styles["head-tablle-text"]}`}>Характеристики</h5>
            <TableDetials />
          </div>
          <div className={`col-12 mt-5`}>
            <h5 className={`${styles["head-tablle-text"]}`}>Інтсрукція</h5>
            <AcordeonDetailsHistory />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            className={` me-4 brn-form ${styles["card-btn-primary"]} ${styles["btn-details"]}  `}
          >
            Зберегти
          </button>
          <button
            className={` brn-form ${styles["card-btn-primary-500"]} ${styles["btn-details"]}   `}
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
};
