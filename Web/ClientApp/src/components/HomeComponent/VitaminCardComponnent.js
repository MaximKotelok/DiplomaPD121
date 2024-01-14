import React, { useState } from "react";
import "./VitaminCard.css"; // Стилі можна налаштувати в окремому CSS файлі

const VitaminCardComponnent = ({ imageUrl, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      //   className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={` image-container ${isHovered ? "hovered" : ""}`}
        //   className="image-container"
      >
        <img className="image-vitamins" src={imageUrl} alt="Card Image" />
      </div>

      <div className="text-container">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default VitaminCardComponnent;
