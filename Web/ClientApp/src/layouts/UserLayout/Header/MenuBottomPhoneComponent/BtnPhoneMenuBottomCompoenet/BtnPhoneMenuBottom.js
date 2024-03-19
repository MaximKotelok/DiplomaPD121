import React from "react";
import styles from "./BtnPhoneMenuBottom.module.css";
import { Link, NavLink } from "react-router-dom";

const BtnPhoneMenuBottom = ({ iconPath, text, to }) => {
  return (
    <NavLink
      tag={Link}
      to={to}
      className={`d-flex align-items-center flex-column justify-content-center `}
    >
      <img
        src={iconPath}
        alt="Icon"
        className=""
        style={{ width: "28px", height: "28px"}}
      />
      <p className={`${styles["text-bottom"]}`} >{text}</p>
    </NavLink>
  );
};

export default BtnPhoneMenuBottom;
