import React, { useState } from "react";
import styles from "./ActualCategoryComponent.module.css"; // Створіть CSS файл для стилізації компонента
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import AdaptiveContainerComponent from "../../../../../Common/AdaptiveContainerComponent/AdaptiveContainerComponent";
import { ApiPath } from "../../../../../../utils/Constants";
import { Link } from "react-router-dom";

const ActualCategoryComponent = ({ id, pathToRecomendedPhoto, title, className }) => {
  return (
    <Link to={`/category/${id}`} className={`${styles["rounded"]} col-4 ${className}`} key={id}>

      <CustomImgComponent src={`${ApiPath}${pathToRecomendedPhoto}`} className={`${styles["img"]}`}/>
      <p className={`${styles["title"]}`}>{title}</p>

    </Link>

  );
};

export default ActualCategoryComponent;
