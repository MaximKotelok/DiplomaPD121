import React, { useState } from "react";
import "./VitaminCard.css"; // Стилі можна налаштувати в окремому CSS файлі

const VitaminCardComponnent = ({ id,imageUrl, text, color }) => {
  console.log(imageUrl)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div role="button" className="category-card category-png-card" onClick={()=>{window.location.href = `/category/${id}`;}}>
      <div
        className={`image-container position-relative`}
        //   className="image-container"
      >
        <img className="image-vitamins" src={imageUrl} alt="Card Image" />
        <div className={`position-absolute background-category-png  ${isHovered ? "hovered " : ""} category-png-backgroud`} style={{backgroundColor: color}}></div>
      </div>
        <p className="category-card-text">{text}</p>

      
      
    </div>
  );
};

export default VitaminCardComponnent;
