import React, { useState, useEffect } from "react";
import STANDART_IMG from "../../../assets/images/StandartPhotoNotFound.svg";
// import { STANDART_IMG } from "../../../utils/Constants";

import placeholder from "../../../assets/images/placeholder.png";
const CustomImgComponent = ({
  src,
  alt,
  defaultSrc = placeholder,
  className,
  style,
}) => {
  const [imageSrc, setImageSrc] = useState(src ? src : defaultSrc);
  useEffect(() => {
    setImageSrc(src ? src : defaultSrc);
  }, [src]);

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
