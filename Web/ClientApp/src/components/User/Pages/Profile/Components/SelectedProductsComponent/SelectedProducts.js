import React, { useEffect, useContext, useState } from "react";
import styles from "./SelectedProducts.module.css";
import FilterData from "./FilterDataComponent/FilterData";
import Filter from "./FilterComponent/Filter";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import srcImg from "../../../../../../assets/images/authPage.png";
import { getFavsProducts } from "../../../../../../services/favProducts";
import { getProductsFromIdsArray } from "../../../../../../services/product";
import { Success } from "../../../../../../utils/Constants";
import { initFavsProducts } from "../../../../../../utils/Functions";
import useWindowSize from "../../UseWindowSize.js";
import { BackButton } from "../../../../Common/BackButton/BackButton.js";
import MiniProductCardComponent2 from "../../../../../Common/MiniProductCardComponent2/MiniProductCardComponent2.js";

const SelectedProducts = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let favs = await getFavsProducts();
    let res = await getProductsFromIdsArray(favs);
    setFavs(res);
  }

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  return (
    <div>
      {isMobile && <BackButton text={"Збережені товари"} />}
      <h4 className={`mb-3 mt-3 ${styles["title-edit-page"]}`}>
        Мої вподобані товари
      </h4>
      {/* <h4>Історія</h4>
      <h6
        className="mb-4 mt-2"
        style={{ color: "rgba(122, 122, 122, 1)", fontSize: "14px" }}
      >
        грудень 23
      </h6>

      <div className=" pe-2 ps-2 mb-3 d-flex justify-content-between ">
        <FilterData />

        <Filter />
      </div> */}

      <div className="d-flex flex-wrap">
        {favs.length > 0 ? (
          favs.map((a) => (
            <MiniProductCardComponent2
              key={a.id}
              id={a.id}
              title={a.title}
              description={a.shortDescription}
              minPrice={a.minPrice}
              countOfPharmacies={a.count}
              manufacturer={a.manufacturer}
              imageUrl={a.pathToPhoto}
              isFavorite={() => true}
              onChangeFavorite={() => {
                setFavs(favs.filter((b) => b.id !== a.id));
              }}
            />
          ))
        ) : (
          <div>
            <h5
              className="mb-3"
              style={{
                fontFamily: "var(--standart-font)",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              В обраних товарах порожньо
            </h5>
            <AccordionComponent
              id="1"
              header="Як додавати товари в обране?"
              title="Натисніть сердечко на картці товару."
            />
            <AccordionComponent
              id="2"
              header="Навіщо додавати товари в обране?"
              title="..."
            />
            <img
              className="mt-3"
              src={srcImg}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedProducts;
