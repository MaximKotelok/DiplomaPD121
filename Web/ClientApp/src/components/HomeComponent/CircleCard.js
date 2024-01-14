import React from "react";
import "./CircleCard.css";

const CircleCard = ({ imageUrl, text }) => {
  return (
    <div className="circle-card">
      <img src={imageUrl} alt="Circle" className="circle-image" />
      <p className="card-text">{text}</p>
    </div>
  );
};

export default CircleCard;
