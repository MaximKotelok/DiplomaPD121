import React, { useEffect, useState } from "react";
import styles from "./HeadOfDetailsComponent.module.css"
import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";

// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";


const HeadOfDetailsComponent = ({ product }) => {
  return (
    <div className='d-flex w-100 mb-5'>

      <CustomImgComponent
      className="me-2"
        style={{ width: "568px", height: "400px", objectFit: "cover" }}
        defaultSrc="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
        src={`${product.pathToPhoto}`}
      />
      <div className='w-75'>
        <NavigationDetailsComponent id={product.id}/>

        <div className={styles['product-details-info-container']}>
          <div>
            <p className={styles['product-details-title']}>{product.title + " " + product.shortDescription}</p>
            <p className={styles['product-details-in-pharmacies']}>в 406 аптеках</p>
            <hr />
          </div>
          <div>
            <p className={styles["price-in-your-city"]}>Ціни у <b>{product.city}</b></p>
            <p className={styles["product-price-range"]}>від
              <span className={styles["product-details-price"]}> {product.from} </span>
              до
              <span className={styles["product-details-price"]}> {product.to} </span>
              грн
            </p>
          </div>
          <hr />

          <div className='row d-flex justify-content-between'>
            <div className='col-6'>
              <a className={`btn ${styles["btn-details"]} ${styles["btn-pharmacies"]} w-100`} href={`/map/${product.id}`}>
                Знайти в аптеках
              </a>
            </div>
            <div className='col-6'>
              <a className={`btn ${styles["btn-details"]} ${styles["btn-analogues"]} w-100`} href={`/map}`}>
                Аналоги
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeadOfDetailsComponent;
