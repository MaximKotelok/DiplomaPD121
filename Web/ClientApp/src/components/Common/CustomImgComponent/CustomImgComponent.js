import React, { useState,useEffect } from "react";
import { STANDART_IMG } from "../../../utils/Constants";

const CustomImgComponent = ({ src, alt, defaultSrc=STANDART_IMG, className, style }) => {
  const [imageSrc, setImageSrc] = useState(src ? src : defaultSrc);
  console.log(src)
  useEffect(()=>{
    setImageSrc(src ? src : defaultSrc);
  },[src])

  const handleImageError = () => {
    setImageSrc(defaultSrc);
  };

  

  return (
    <img
      className={className}
      style={style}
      src={imageSrc}
      alt={alt}
      onError={handleImageError}
    />
  );
};

export default CustomImgComponent;
