import React, { useState } from "react";
import styles from "./ActualCategoryComponent.module.css"; // Створіть CSS файл для стилізації компонента
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import AdaptiveContainerComponent from "../../../../../Common/AdaptiveContainerComponent/AdaptiveContainerComponent";
import { ApiPath } from "../../../../../../utils/Constants";
import { Link } from "react-router-dom";
import actialCategoryPlaceholder from "../../../../../../assets/images/home/actual-category-placeholder.svg"
const ActualCategoryComponent = ({ id, pathToRecomendedPhoto, title, className }) => {
  return (
    <Link to={`/category/${id}`} className={`${styles["rounded"]} col-6 col-md-4 ${className} la`} key={id}>

      <CustomImgComponent defaultSrc={actialCategoryPlaceholder} src={`${ApiPath}${pathToRecomendedPhoto}`} className={`${styles["img"]}`}/>
      <p className={`${styles["title"]}`}>{title}</p>

    </Link>

  );
};

export default ActualCategoryComponent;
