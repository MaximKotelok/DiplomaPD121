import React, { useState, useRef } from 'react';

import placeholder from "../../../../../assets/images/placeholder.png";
import { ApiPath } from '../../../../../utils/Constants';

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
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <img
        className='product-image'
        src={preview || (imageUrl && ApiPath + imageUrl) || placeholder}
        alt="Selected"
        style={{ cursor: 'pointer', maxWidth: '300px', maxHeight: '300px' }}
        onClick={() => fileInputRef.current.click()}
      />
    </div>
  );
};

export default ImageUploaderComponent;
