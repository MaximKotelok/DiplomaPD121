import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";
import { useLocation, useParams } from "react-router-dom";
// import "./Details.css";

import { addToRecentlyViewedProduct } from "../../../../utils/SessionStorage";
import { Description } from "./Component/DescriptionComponent/Description";
import {
  ApiPath,
  GetProduct,
  PhotoPath,
  StateInfos,
  Success,
} from "../../../../utils/Constants";
import DescriptionCategoryPathComponent from "./Component/CategoryPathDetailsComponent/CategoryPathDetailsComponent";
import { CharacteristicComponent } from "./Component/CharacteristicComponent/CharacteristicComponent";
import { CharacteristicTableComponent } from "./Component/CharacteristicTableComponent/CharacteristicTableComponent";
import AccordionComponent from "../../../Common/AccordionQuestionComponent/accordionComponent";
import HeadOfDetailsComponent from "./Component/HeadOfDetailsComponent/HeadOfDetailsComponent";
import { getCookie } from "../../../../utils/Cookies";
import { getPathToCategory } from "../../../../services/category";
import {
  GetPriceHistory,
  getMinAndMaxPrice,
  getProductById,
} from "../../../../services/product";
import MedicineTableComponent from "./Component/MedicineTableComponent/MedicineTableComponent";
import PriceHistoryComponent from "./Component/PriceHistoryComponent/PriceHistoryComponent";
import bannerBottom from "../../../../assets/images/details/banner-bottom.png";
import useWindowSize from "../Profile/UseWindowSize";

export const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    addToRecentlyViewedProduct(id);
    init();
  }, []);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const targetElement = document.querySelector(hash);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loader]);

  async function init() {
    const res = await getProductById(id);
    if (res.status === Success) {
      let product;
      if (res.data.product) {
        product = res.data.product;
        product.properties.unshift({
          name: "Діюча Речовина",
          value: res.data.activeSubstance,
        });
        product.medicineTable = res.data.medicineTable;
      } else {
        product = res.data;
      }
      let path = await getPathToCategory(product.categoryID);
      let minAndMaxPrice = await getMinAndMaxPrice(id);
      if (path.status === Success && minAndMaxPrice.status === Success) {
        product.city = getCookie("city");
        product.pathToPhoto = `${ApiPath}${product.pathToPhoto}`;
        product.from = minAndMaxPrice.data.minPrice;
        product.to = minAndMaxPrice.data.maxPrice;
        product.activeSubstanceId = res.data.activeSubstanceID;
        product.pathToCategory = path.data;
        product.properties.unshift({
          name: "Категорія",
          value: path.data.slice(-1)[0].title,
        });
        setProduct(product);

        let priceHistoryResult = await GetPriceHistory(id);
        if (priceHistoryResult.status === Success) {
          setPriceHistory(priceHistoryResult.data);
        }
        setLoader(StateInfos.LOADED);
      } else {
        setLoader(StateInfos.ERROR);
      }
    } else {
      setLoader(StateInfos.ERROR);
    }
  }

  useEffect(() => {
    if (loader === StateInfos.ERROR) {
      window.location.href = "/404";
    }
  }, [loader]);

  if (loader != StateInfos.LOADED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DescriptionCategoryPathComponent data={product.pathToCategory} />

      <HeadOfDetailsComponent product={product} />

      <div className="row">
        <p className={`${styles["section-title"]}`}>Характеристики</p>
        <CharacteristicComponent data={product.properties} />
      </div>

      <div className="row" id="instruction">
        <p className={`${styles["section-title"]}`}>Опис</p>
        <Description
          separeteBy={product.description.includes("h1") ? "h1" : ""}
        >
          {product.description}
        </Description>
      </div>

      <hr />

      {product.medicineTable && (
        <MedicineTableComponent data={product.medicineTable} />
      )}

      <div className="row">
        <p className={`${styles["section-title"]}`} id="characteristic">
          Характеристики
        </p>
        <CharacteristicTableComponent
          data={product.properties.map((a) => {
            return { name: a.name, value: a.value };
          })}
        />
      </div>

      <div className="row">
        <p className={`${styles["section-title"]}`} id="questions">
          Часті питання
        </p>
        <div className="col-12 col-md-12 col-lg-6">
          <AccordionComponent />
          <AccordionComponent />
          <AccordionComponent />
        </div>

        <div
          className={` col-lg-6 ${styles["responsive-component"]} d-flex justify-content-end`}
        >
          <img src={bannerBottom} className={`${styles["img-w-h-240"]}`} />
        </div>

        <div>
          {priceHistory && priceHistory.length > 0 && (
            <div className="row" style={{ padding: "0" }}>
              <p className={`${styles["section-title"]}`} id="characteristic">
                Середня ціна по Україні
              </p>
              <div className="col-12">
                <PriceHistoryComponent history={priceHistory} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
