import React, { useState } from "react";
import styles from "./DropDownService.module.css";
import BlockMenu from "./Components/BlockMenu.js";
import Medecine from "./tabler-icon-first-aid-kit.svg";
import SearchIcon from "./tabler-icon-list-search.svg";
import AlertIcon from "./tabler-icon-alert-triangle.svg";
import { ReactComponent as ServiceIcon } from "./ServiceIcon.svg";

export const DropDownService = ({ className }) => {
  return (
    <div className={`dropdown ${className}`}>
      <button
        className={`btn   d-flex align-items-center ${styles["btn-service"]}  ${styles["btn-style-hover"]}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ServiceIcon
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />

        <span className="text-center  text-white flex-grow-1">Сервіси</span>
      </button>

      <div
        style={{ zIndex: "100", position: "absolute" }}
        className={`dropdown-menu ${styles["dropdown-my-menu"]}`}
      >
        <div className={`mb-3`}>
          <BlockMenu iconPath={Medecine} hrf="/map" text="Аптеки поблизу" />
        </div>
        {/* <div className={`mb-3`}>
          <BlockMenu iconPath={SearchIcon} text="Пошук по діючій речовині" />
        </div> */}
        {/* <div className={``}>
          <BlockMenu
            iconPath={AlertIcon}
            hrf="/DefectiveSeries"
            text="Браковані серії"
          />
        </div> */}
      </div>
    </div>
  );
};
