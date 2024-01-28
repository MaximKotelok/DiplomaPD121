import React from "react";
import "./CircleCard.css";

import brandImg from "../../../assets/images/BrandTmp.png"

const CircleCard = ({ imageUrl=brandImg, text }) => {
  return (
    <div className="circle-card">      
      <img src={imageUrl} alt="Circle" className="circle-image" />
      <p className="card-text">{text}</p>
    </div>
  );
};

export default CircleCard;
