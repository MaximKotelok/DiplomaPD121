import React, { useState, useRef } from 'react';

import placeholder from "../../../../../assets/images/placeholder.png";
import { ApiPath } from '../../../../../utils/Constants';

import styles from "./ImageUploader.module.css"

const ImageUploaderComponent = ({selectedImage, setSelectedImage, imageUrl}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div role='button'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <img    
        src={preview || (imageUrl && ApiPath + imageUrl) || placeholder}
        alt="Selected"
        className={`${styles["image-upload"]}`}        
        onClick={() => fileInputRef.current.click()}
      />
    </div>
  );
};

export default ImageUploaderComponent;
