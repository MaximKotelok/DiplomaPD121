import React from "react";
import "./CircleCard.css";
import { Link } from "react-router-dom";

import brandImg from "../../../assets/images/BrandTmp.png"
import CustomImgComponent from "../CustomImgComponent/CustomImgComponent";
const CircleCard = ({ id, imageUrl=brandImg, text }) => {
  return (
    <Link to={`/Search/ByBrand/${id}`}>
    <div className="circle-card">      
      <CustomImgComponent src={imageUrl} defaultSrc={brandImg} alt="Circle" className="circle-image" />
      <p className="card-text">{text}</p>
    </div>
    </Link>
  );
};

export default CircleCard;
