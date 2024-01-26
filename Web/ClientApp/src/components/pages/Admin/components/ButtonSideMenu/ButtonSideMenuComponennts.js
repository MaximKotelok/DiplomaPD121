import React, { useState } from "react";
import "./ButtonSideMenu.css";

const ButtonSideMenuComponennts = ({ text, icon, link, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    backgroundColor: isActive
      ? "#007AFF"
      : isHovered
      ? "rgba(0, 122, 255, 0.15)"
      : "transparent",
    color: isActive ? "yellow" : "red",
  };

  return (
    <a
      className="custom-button nav-link link-body-emphasis"
      href={link}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
    >
      {icon && <img className="button-icon" src={icon} alt="Icon" />}
      {icon && text && <span className="icon-text-separator">&nbsp;</span>}
      <div className="textBtn">{text}</div>
    </a>
  );
};

export default ButtonSideMenuComponennts;
