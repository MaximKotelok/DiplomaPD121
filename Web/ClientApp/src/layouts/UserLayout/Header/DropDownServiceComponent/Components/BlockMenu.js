import React from "react";
import styles from "./BlockMenu.module.css";
import { NavLink } from "react-router-dom";

const BlockMenu = ({ iconPath, text,hrf }) => {
  return (
    <NavLink to={hrf}
      className={` ${styles["nav-link-service"]} d-flex align-items-center p-2
     `}
    >
      <img src={iconPath} className={"me-3  ms-2"} />
      <span>{text}</span>
    </NavLink>
  );
};

export default BlockMenu;
