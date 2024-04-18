import React, { useState } from "react";
import styles from "./AddCategoryComponents.module.css";
import { CSSTransition } from "react-transition-group";
import { CategoryBlock } from "./components/CategoryBlock/CategoryBlock";
import { SelectPhoto } from "./components/SelectPhoto/SelectPhoto";
import { ReactComponent as ZnakOkloko } from "./znakOkloko.svg";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import CustomSelectComponent from "../../Brand/AddBrandComponents/CustomSelectComponent/CustomSelectComponent";

export const AddCategoryComponents = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
  };
  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} d-flex flex-column `}>
        <h4 className={`${styles["text-header-page"]}`}>Додавання категорії</h4>

        <div className="row" style={{ margin: 0, padding: 0 }}>
          <div className={`col-6`}>
            <div className="mb-1">
              <label>Назва категорії</label>
              <input
                placeholder="Введіть назву нової категорї..."
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                label="Ім'я"
                type="text"
                name="username"
                //   value={userFormData.username}
                //   onChange={(e)=>{handleInputChange(e, setUserFormData, userFormData)}}
              />
            </div>
            <div className="dropdown">
              <div>
                <label>Батьківська категорія</label>
              </div>
              {/* <select
                className={`my-form-select ${styles["my-input-text-form-combo"]} `}
                // aria-label="Обери країну"
              >
                <option selected>Оберіть категорії</option>
                <option value="1">Action</option>
                <option value="2">Another action</option>
              </select>
               */}
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
            </div>
            <div className="d-flex flex-wrap pt-1 mb-2">
              <CategoryBlock text={"Ліки"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Аскорбінка"} />
              <CategoryBlock text={"Ліки"} />
            </div>

            <SelectPhoto text={"Фото"} />
          </div>

          <div className={`col-6`}>
            <div className="d-flex align-items-center justify-content-between">
              <CheckedBox
                onChange={handleCheckboxChange}
                text="Чи актуальна категорія?"
              />
              <ZnakOkloko />
            </div>

            <div className={styles.photoContainer}>
              <CSSTransition
                in={isChecked}
                timeout={300}
                classNames={{
                  enter: styles.fadeEnter,
                  enterActive: styles.fadeEnterActive,
                  exit: styles.fadeExit,
                  exitActive: styles.fadeExitActive,
                }}
                unmountOnExit
              >
                <SelectPhoto text={`Фото для “Актуальних категорій”`} />
              </CSSTransition>
            </div>
          </div>
        </div>

        <div className={`d-flex justify-content-center mt-auto`}>
          <button
            className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
            //   onClick={() => setShow(true)}
          >
            Зберегти
          </button>

          <button
            className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
            type="submit"
          >
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
};
