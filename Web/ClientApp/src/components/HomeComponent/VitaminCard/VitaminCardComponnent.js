import React, { useState } from "react";
import "./VitaminCard.css"; // Стилі можна налаштувати в окремому CSS файлі

const VitaminCardComponnent = ({ imageUrl, text, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="category-card">
      <div
        className={`image-container position-relative`}
        //   className="image-container"
      >
        <img className="image-vitamins" src={imageUrl} alt="Card Image" />
        <div className={`position-absolute background-category-png  ${isHovered ? "hovered " : ""}`} style={{backgroundColor: color}}></div>
      </div>
        <p className="category-card-text">{text}</p>

      
      
    </div>
  );
};

export default VitaminCardComponnent;
