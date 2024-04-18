import React, { useState } from "react";
import styles from "./UpsertBrendComponent.module.css";
import BtnWarningModal from "../../../Common/BtnWarningModal/BtnWarningModal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import CustomSelectComponent from "../../Brand/AddBrandComponents/CustomSelectComponent/CustomSelectComponent";
const VisuallyHiddenInput = styled("input")({
  clip: "rgba(229, 229, 234, 1)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledButton = styled(Button)({
  width: "250px",
  height: "42px",
  color: "rgba(122, 122, 122, 1)",
  backgroundColor: "rgba(229, 229, 234, 1)",
  borderRadius: "16px",
  // padding: "12px 12px",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "var(--sans-serif)",
  // marginLeft: "50px",
  margin: "0 auto",
  "&:hover": {
    color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
    backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
  },
});
export const UpsertBrendComponent = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <divv className="">
          <h6 className={`col-12 ${styles["header-text-add"]}`}>
            Додавання бренду
          </h6>
        </divv>
        <div className={`row ${styles["card-border"]}`}>
          <div className={`col-4 d-flex  flex-column `}>
            <label className={`${styles["label-head"]}`}>Логотип</label>
            <div className={`d-flex flex-column  justify-content-center `}>
              <img
                src={imageSrc}
                alt="no photo"
                className={`${styles["img-product"]} mb-2`}
              />
              <StyledButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
              >
                Оберіть файл
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </StyledButton>
            </div>
          </div>

          <div className={`col-8 `}>
            <div className={`d-flex   justify-content-between `}>
              {/* <div className=" flex-grow-1 mb-1 me-3">
                <label>Назва</label>
                <input
                  className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                  placeholder="Введіть назву фарма-компанії"
                  type="text"
                  name=""
                />
              </div>
               */}
              <InpurtStandart
                label={"Назва"}
                placholder={"Введіть назву фарма-компанії"}
                className={"me-3"}
              />

              {/* <div className="dropdown">
                <div>
                  <label>Країна</label>
                </div>
                <select
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

              <div>
                <div>
                  <label>Країна</label>
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
              </div>
            </div>

            <div>
              {/* <div className="mb-1">
                <label>Опис</label>
                <textarea
                  className={`${styles["text-area-zayavka"]}`}
                  placeholder="Ведіть опис фарма-компанії"
                  type="text"
                  rows={4}
                  name=""
                />
              </div> */}
              <TextAreaStandart
                label={"Опис"}
                placholder={"Ведіть опис фарма-компанії"}
              />
            </div>
          </div>

          {/* <div className={`col-5 `}>
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
          </div> */}
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
