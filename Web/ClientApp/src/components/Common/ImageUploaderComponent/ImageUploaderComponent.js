import React, { useState, useRef } from 'react';

import placeholder from "../../../assets/images/placeholder.png";
import { ApiPath } from '../../../utils/Constants';

import styles from "./ImageUploader.module.css"
import CustomImgComponent from '../CustomImgComponent/CustomImgComponent';

const ImageUploaderComponent = ({ selectedImage, setSelectedImage, imageUrl }) => {
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
      <div
        onClick={() => fileInputRef.current.click()}>

        <CustomImgComponent
          src={preview || (imageUrl && ApiPath + imageUrl)}
          alt="Selected"
          className={`${styles["image-upload"]}`}
        />
      </div>
    </div>
  );
};

export default ImageUploaderComponent;
