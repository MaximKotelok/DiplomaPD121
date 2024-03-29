import React from "react";
import "./CircleCard.css";
import { Link } from "react-router-dom";

import brandImg from "../../../assets/images/BrandTmp.png"
const CircleCard = ({ id, imageUrl=brandImg, text }) => {
  return (
    <Link to={`/Search/ByBrand/${id}`}>
    <div className="circle-card">      
      <img src={imageUrl} alt="Circle" className="circle-image" />
      <p className="card-text">{text}</p>
    </div>
    </Link>
  );
};

export default CircleCard;
