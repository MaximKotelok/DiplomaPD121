import React, { useState } from 'react';

const CustomImgComponent = ({ src, alt, defaultSrc, className, style }) => {
  const [imageSrc, setImageSrc] = useState((src?src:defaultSrc));

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
