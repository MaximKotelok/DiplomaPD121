import React, { useState } from "react";
import styles from "./UpsertManufactureComponent.module.css";

import BtnWarningModal from "../../../Common/BtnWarningModal/BtnWarningModal";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import CustomSelectComponent from "../../Brand/AddBrandComponents/CustomSelectComponent/CustomSelectComponent";

export const UpsertManufactureComponent = () => {
  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <divv className="">
          <h6 className={`col-12 ${styles["header-text-add"]}`}>
            Додавання виробника
          </h6>
        </divv>

        <div className={`row ${styles["card-border"]}`}>
          <div className={`d-flex   justify-content-between `}>
            {/* <div className=" flex-grow-1 mb-1 me-3">
              <label>Назва виробника</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Введіть назву виробника товару..."
                type="text"
                name=""
              />
            </div> */}
            <InpurtStandart
              placholder={"Введіть назву виробника товару..."}
              label={"Назва виробника"}
              className={"me-3"}
            />

            {/* <div className=" flex-grow-1 mb-1 me-3">
              <label>URL сайту виробника</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="http://www.example.com"
                type="text"
                name=""
              />
            </div> */}
            <InpurtStandart
              placholder={"http://www.example.com"}
              label={"URL сайту виробника"}
              className={"me-3"}
            />
            <div className="">
              {/* <div className="dropdown"> */}
              <div>
                <label>Країна виробника</label>
              </div>
              <CustomSelectComponent
                // selectedId={pharmacyFormData.pharmaCompanyID}
                className={` ms-1 my-form-select ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
                name="pharmaCompanyID"
                placeholder="Фарма компанія"
                // options={
                //   dataFromServer.pharmaCompanies &&
                //   dataFromServer.pharmaCompanies.map &&
                //   dataFromServer.pharmaCompanies.map((item) => ({
                //     value: item.id,
                //     label: item.title,
                //   }))
                // }
                // onChange={(selectedOption) => {
                //   setPharmacyFormData({
                //     ...pharmacyFormData,
                //     pharmaCompanyID: selectedOption.value,
                //   });
                // }}
              />

              {/* <select
                className={`my-form-select ${styles["my-input-text-form"]} ${styles["my-w-text-celect"]}`}
                // aria-label="Обери країну"
              >
                <option selected>Open this </option>
                <option value="1">Action</option>
                <option value="2">Another action</option>
                <option value="3">Something else here</option>
                <option disabled>---</option>
                <option value="4">Separated link</option>
              </select>
            </div> */}
            </div>
          </div>

          <div className={`d-flex   justify-content-between `}>
            {/* <div className=" flex-grow-1 mb-1 me-3">
              <label>Фізична адреса виробника</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Місто / Вулиця / Будинок "
                type="text"
                name=""
              />
            </div> */}
            <InpurtStandart
              placholder={"Місто / Вулиця / Будинок"}
              label={"Фізична адреса виробника"}
              className={"me-3"}
            />

            <div className="mb-1 me-3">
              <label>Виробник дійсний?</label>
              <CheckedBox text="так" />
            </div>
          </div>

          {/* <div>
              <div className="mb-1">
                <label>Опис</label>
                <textarea
                  className={`${styles["text-area-zayavka"]}`}
                  placeholder="Ведіть опис фарма-компанії"
                  type="text"
                  rows={4}
                  name=""
                />
              </div>
            </div> */}
        </div>

        <div className="d-flex justify-content-center">
          <div>
            <BtnWarningModal text="бла бла бла ла не хоч не треба виробника" />
          </div>
        </div>
      </div>
    </div>
  );
};
