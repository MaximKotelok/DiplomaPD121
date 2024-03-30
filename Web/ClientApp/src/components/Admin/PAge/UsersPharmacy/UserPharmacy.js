import React, { useState } from "react";
import { ReactComponent as Palka } from "./Palka.svg";
import styles from "./UserPharmacy.module.css";

export const UserPharmacy = () => {
  const [IsActive, setIsActive] = useState(true);

  return (
    <div className={`${styles["row-parent"]} row`}>
      <div className={` ${styles["col-parent-left"]} col-md 6`}>
        <div className={`d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані Аптеки</h4>
            <h3>01.</h3>
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

          <div className="row md-1">
            <div className="col-12 col-md-6">
              <label>Довгота</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Довгота"
                type="text"
                name=""
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Широта</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Широта"
                type="text"
                name=""
              />
            </div>
          </div>

          <div className="dropdown">
            <label>Компанія</label>

            <select
              className={`my-form-select ${styles["my-input-text-form"]}`}
              aria-label="Default select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">Action</option>
              <option value="2">Another action</option>
              <option value="3">Something else here</option>
              <option disabled>---</option>
              <option value="4">Separated link</option>
            </select>
          </div>

          <div className="mt-2">
            <label>Графік роботи</label>

            <div className={`d-flex  align-items-center`}>
              <label className="me-3 mb-0">пн - сб</label>
              <input
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
                placeholder="00:00"
                type="text"
                name=""
              />
              <Palka />
              <input
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
                placeholder="00:00"
                type="text"
                name=""
              />
            </div>

            <div className={`d-flex mt-2  align-items-center`}>
              <label className="me-3 mb-0">пн - сб</label>
              <input
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
                placeholder="00:00"
                type="text"
                name=""
              />
              <Palka />
              <input
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
                placeholder="00:00"
                type="text"
                name=""
              />
            </div>
          </div>

          <button className="brn-form brn-primary-form mt-auto" type="submit">
            Вхід
          </button>
        </div>
      </div>

      <div
        className={` ${IsActive ? styles["disable-block"] : ""}    ${
          styles["col-parent-right"]
        } col-md 6`}
      >
        <div className={` d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані Аптеки</h4>
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

          <button className="brn-form brn-primary-form mt-auto" type="submit">
            Вхід
          </button>
        </div>
      </div>
    </div>
  );
};
