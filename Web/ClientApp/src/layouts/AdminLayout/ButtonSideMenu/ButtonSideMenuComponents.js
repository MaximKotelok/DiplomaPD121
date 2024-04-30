import React, { useState } from "react";
import "./ButtonSideMenu.css";
import { NavLink } from "react-router-dom";

const ButtonSideMenuComponennts = ({
  text,
  icon,
  link,
  onClick,
  className = "button-icon",
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `custom-button nav-link link-body-emphasis nav-admin ${
          isActive && "active-nav-admin"
        }`
      }
      to={link}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon && <img className={className} src={icon} alt="Icon" />}
      {icon && text && <span className="icon-text-separator">&nbsp;</span>}
      <div className="textBtn">{text}</div>
    </NavLink>
  );
};

export default ButtonSideMenuComponennts;
