import React from "react";
import "./CircleCard.css";

import brandImg from "../../styles/images/BrandTmp.png"

const CircleCard = ({ imageUrl, text }) => {
  return (
    <div className="circle-card">      
      <img src={brandImg} alt="Circle" className="circle-image" />
      <p className="card-text">{text}</p>
    </div>
  );
};

export default CircleCard;
