import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    if (product.id) setIsFavoriteState(isFavoriteProduct(product.id));
  }, [product]);
  return (
    <div className="row w-100 mb-5">
      {/* <div className="d-flex w-100 mb-5"> */}

      <div className={`${styles["panel-navigation-top"]} mb-4`}>
        <NavigationDetailsComponent id={product.id} />
      </div>

      <div className={"col-12  col-md-5"} style={{ position: "relative" }}>
        <HeartComponent
          id={product.id}
          isFavorite={isFavoriteState}
          setIsFavorite={setIsFavoriteState}
          className={`position-absolute top-0  ${styles["heart-styles"]} `}
        />
        {/* <Heart className={`position-absolute top-0  ${styles["heart-styles"]} `}  /> */}
        <CustomImgComponent
          className="me-2"
          // style={{ width: "568px", height: "400px", objectFit: "cover" }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={`${product.pathToPhoto}`}
        />
      </div>

      {/* <div className="w-75"> */}
      <div className="col-12   col-md-7">
        <div className={`${styles["panel-navigation-bottom"]}`}>
          <NavigationDetailsComponent id={product.id} />
        </div>

        <div className={styles["product-details-info-container"]}>
          <div>
            <p className={styles["product-details-title"]}>
              {product.title + " " + product.shortDescription}
            </p>
            <p className={styles["product-details-in-pharmacies"]}>
              в 406 аптеках
            </p>
            <hr className={`${styles["panel-navigation-sm"]}`} />
          </div>
          <div>
            <p className={styles["price-in-your-city"]}>
              Ціни у <b className={styles["in-your-city"]}>{product.city}</b>
            </p>
            <p className={styles["product-price-range"]}>
              {product.from && product.to?<span>

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
              </span>:
              <span>
                Немає у вашему місті
              </span>
              }
            </p>
          </div>

          {/* <div>
            <AdditionalDivRadio title="Смак" />
          </div> */}

          <hr className={`${styles["panel-navigation-sm"]}`} />

          <div className="row mt-4">
            <div className={`col-12 col-md-6 ${styles["pe-md-3"]} p-0  d-flex`}>
              <Link
                className={`brn-form ${styles["card-btn-primary"]}  ${styles["btn-styled-standart"]} `}
                to={`/map/${product.id}`}
              >
                Знайти в аптеках
              </Link>
            </div>
            {product.activeSubstanceId && (
              <div
                className={`col-12 col-md-6 ${styles["ps-md-3"]} p-0 d-flex`}
              >
                <Link
                  to={`/Search/ByActiveSubstance/${product.activeSubstanceId}`}
                  className={` brn-form ${styles["card-btn-primary-500"]}  ${styles["btn-styled-standart"]}    `}
                >
                  Аналоги
                </Link>
              </div>
            )}
          </div>

          {/* <div className="row d-flex justify-content-between">
            <div className="col-6">
              <Link
                className={`btn ${styles["btn-details"]} ${styles["btn-pharmacies"]} w-100`}
                href={`/map/${product.id}`}
              >
                Знайти в аптеках
              </Link>
            </div>

            {product.activeSubstanceId && (
              <div className="col-6">
                <Link
                  to={`/Search/ByActiveSubstance/${product.activeSubstanceId}`}
                  className={`btn ${styles["btn-details"]} ${styles["btn-analogues"]} w-100`}
                  href={`/map}`}
                >
                  Аналоги
                </Link>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeadOfDetailsComponent;
