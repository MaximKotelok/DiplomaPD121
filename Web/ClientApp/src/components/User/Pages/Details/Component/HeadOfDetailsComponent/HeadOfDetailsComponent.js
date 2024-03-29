import React, { useEffect, useState } from "react";
import styles from "./HeadOfDetailsComponent.module.css";
import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import { BtnRadioSelectedProduct } from "../../../../../Common/BtnRadioSelectedProductComponent/BtnRadioSelectedProduct";
import { AdditionalDivRadio } from "../AdditionalComponent/AdditionalDivRadio";
import { ReactComponent as Heart } from "../../../../../../assets/images/details/heart.svg";
import HeartComponent from "../HeartComponent/HeartComponent";
import { isFavoriteProduct } from "../../../../../../utils/Functions";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";

const HeadOfDetailsComponent = ({ product }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  useEffect(() => {
    if (product.id)
      setIsFavoriteState(isFavoriteProduct(product.id));
  }, [product])
  return (
    <div className="d-flex w-100 mb-5">
      <div style={{ position: "relative" }}>
        <HeartComponent
          id={product.id}
          isFavorite={isFavoriteState}
          setIsFavorite={setIsFavoriteState}
          className={`position-absolute top-0  ${styles["heart-styles"]} `}  
        />
        {/* <Heart className={`position-absolute top-0  ${styles["heart-styles"]} `}  /> */}
        <CustomImgComponent
          className="me-2"
          style={{ width: "568px", height: "400px", objectFit: "cover" }}
          defaultSrc="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
          src={`${product.pathToPhoto}`}
        />
      </div>
      <div className="w-75">
        <NavigationDetailsComponent id={product.id} />

        <div className={styles["product-details-info-container"]}>
          <div>
            <p className={styles["product-details-title"]}>
              {product.title + " " + product.shortDescription}
            </p>
            <p className={styles["product-details-in-pharmacies"]}>
              в 406 аптеках
            </p>
            <hr />
          </div>
          <div>
            <p className={styles["price-in-your-city"]}>
              Ціни у <b className={styles["in-your-city"]}>{product.city}</b>
            </p>
            <p className={styles["product-price-range"]}>
              від
              <span className={styles["product-details-price"]}>
                {" "}
                {Number(product.from).toFixed(2)}{" "}
              </span>
              до
              <span className={styles["product-details-price"]}>
                {" "}
                {Number(product.to).toFixed(2)}{" "}
              </span>
              грн
            </p>
          </div>

          <div>
            <AdditionalDivRadio title="Смак" />
          </div>

          <hr />

          <div className="row d-flex justify-content-between">
            <div className="col-6">
              <a
                className={`btn ${styles["btn-details"]} ${styles["btn-pharmacies"]} w-100`}
                href={`/map/${product.id}`}
              >
                Знайти в аптеках
              </a>
            </div>
            <div className="col-6">
              <a
                className={`btn ${styles["btn-details"]} ${styles["btn-analogues"]} w-100`}
                href={`/map}`}
              >
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
