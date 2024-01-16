import React, { useState } from "react";
import "./PopularButton.css"; // Створіть CSS файл для стилізації компонента

const PopularButtonComponnent = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`your-component ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="inner-text">{text}</div>
    </div>
  );
};

export default PopularButtonComponnent;
