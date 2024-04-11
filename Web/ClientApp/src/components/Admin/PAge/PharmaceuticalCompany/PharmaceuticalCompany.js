import React, { useState } from "react";

import styles from "./PharmaceuticalCompany.module.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  width: "200px",
  height: "55px",
  color: "rgba(122, 122, 122, 1)",
  backgroundColor: "rgba(229, 229, 234, 1)",
  borderRadius: "16px",
  padding: "16px 20px",
  fontSize: "18px",
  fontWeight: "700",
  fontFamily: "var(--sans-serif)",
  marginLeft: "50px",
  "&:hover": {
    color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
    backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
  },
});

export const PharmaceuticalCompany = () => {
  // якщо форму під номер 01 заповним ок то потрібно IsActivet(false)  щоб форма 02 стала норм

  const [IsActive, setIsActive] = useState(true);
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
    <div className={`${styles["row-parent"]} row`}>
      <div className={` ${styles["col-parent-left"]} col-md 6`}>
        <div className={`d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані Фарма-Компанії</h4>
            <h3>01.</h3>
          </div>

          <div className="mb-1">
            <label>Назва</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Введіть назву фарма-компанії"
              type="text"
              name=""
            />
          </div>
          <div className="mb-1">
            <label>Опис</label>
            <textarea
              className={`${styles["text-area-zayavka"]}`}
              placeholder="Ведіть опис фарма-компанії"
              type="text"
              rows={3}
              name=""
            />
          </div>
          <div>
            <label>Фото</label>

            <div className={`d-flex  align-items-center`}>
              <img
                src={imageSrc}
                alt="no photo"
                className={`${styles["img-brend"]}`}
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

          <div className={`d-flex mt-auto`}>
            <button
              className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
              type="submit"
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

      <div
        className={` ${IsActive ? styles["disable-block"] : ""}    ${
          styles["col-parent-right"]
        } col-md 6`}
      >
        <div className={` d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані адміна фарма-компанії</h4>
            <h3>02.</h3>
          </div>

          <div className="mb-1">
            <label>Адреса</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Введіть адресу аптеки"
              type="text"
              name=""
            />
          </div>
          <div className="mb-1">
            <label>Адреса</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Введіть адресу аптеки"
              type="text"
              name=""
            />
          </div>

          <div className="mb-1">
            <label>Адреса</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Введіть адресу аптеки"
              type="text"
              name=""
            />
          </div>



          <div className={`d-flex mt-auto`}>
            <button
              className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
              type="submit"
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
    </div>
  );
};
