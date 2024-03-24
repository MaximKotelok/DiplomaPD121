import React from "react";
import styles from "./BtnRol.module.css";

export const BtnRol = () => {
  return (
    <div className={`${styles["div-osnova"]} d-flex align-items-center`}>
      <div>
        <h2 className={`${styles["text-login-phar"]} ${styles["text-head"]} `}>
          Раді Вас бачити!
        </h2>
        <h4 className={`${styles["text-login-phar"]} ${styles["text-head2"]} `}>
          В яку адмін-частину ви б хотіли зайти?
        </h4>
        <button
          className="brn-form btn-primary-form-pharmacy mt-4 mb-3"
          type=""
        >
          Я фармацевт
        </button>

        <button className="brn-form btn-primary-form-pharmacy mb-3 " type="">
          Я представник кокомпанії
        </button>
      </div>
    </div>
  );
};
