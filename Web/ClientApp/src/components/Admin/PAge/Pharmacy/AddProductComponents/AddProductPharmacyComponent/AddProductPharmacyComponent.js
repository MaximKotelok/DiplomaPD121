import React from "react";
import styles from "./AddProductPharmacyComponent.module.css";
import AutoCompleteInput from "../../../../../Common/AutoCompleteInputComponent/AutoCompleteInput ";
import BtnWarningModal from "./components/BtnEditStatusModalUser/BtnWarningModal";

export const AddProductPharmacyComponent = () => {
  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <divv className="">
          <h6 className={`col-12 ${styles["header-text-add"]}`}>
            Оберіть товар
          </h6>
          <AutoCompleteInput />
        </divv>
        <div className="row" style={{ height: "203px" }}>
          <div className={`col-4 d-flex   `}>
            <label className={`${styles["label-head"]}`}>Товар</label>
            <img
              src="https://root.tblcdn.com/img/goods/8d1aab55-2c38-11ec-bacc-0050569aacb6/1/img_0.jpg?v=AAAAAAmKo34"
              className={` mt-auto ${styles["img-product"]}`}
            />
          </div>
          <div className={`col-5 `}>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Назва</label>
              <p className={`${styles["text-opus"]}`}>Стрепсілс інтенсив</p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Опис</label>
              <p className={`${styles["text-opus"]}`}>Стрепсілс інтенсив</p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Виробник</label>
              <p className={`${styles["text-opus"]}`}>Стрепсілс інтенсив</p>
            </div>
          </div>
          <div className={`col-3`}>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Ціна</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Вкажіть ціну товару"
                type="text"
                name=""
              />
            </div>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Кількість</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Вкажіть кількість товару на складі"
                type="text"
                name=""
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div>
            <BtnWarningModal />
          </div>
        </div>
      </div>
    </div>
  );
};
