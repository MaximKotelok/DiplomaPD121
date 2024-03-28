import React from "react";
import styles from "./FormaLogin.module.css";
import { NavLink } from "react-router-dom";

export const FormaLogin = () => {
  return (
    <div className={`${styles["div-osnova"]} d-flex align-items-center`}>
      <div className="w-100">
        <h2 className={`${styles["head-text"]} mb-4`}>Вхід</h2>
        <div className="mb-2">
          <input
            className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`}
            placeholder="Email"
            type="text"
            name="email"
          />
        </div>
        <div className="mb-2">
          <input
            className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`}
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>

        <button className="brn-form brn-primary-form mb-2" type="submit">
          Вхід
        </button>
        <NavLink className={`${styles["link-password"]}`}>
          Забули пароль?
        </NavLink>
      </div>
    </div>
  );
};
