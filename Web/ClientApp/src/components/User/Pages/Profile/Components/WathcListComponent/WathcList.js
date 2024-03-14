import React, { useEffect, useContext, useState } from "react";
// import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import srcImg from "../../../../../../assets/images/authPage.png";
import FilterData from "../SelectedProductsComponent/FilterDataComponent/FilterData";
import Filter from "../SelectedProductsComponent/FilterComponent/Filter";
import { getRecentlyViewedProductsIds } from "../../../../../../utils/SessionStorage";
import { getProductsFromIdsArray } from "../../../../../../services/product";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import { initFavs, isFavorite } from "../../../../../../utils/Functions";

const WathcList = () => {
  const [recently, setRecently] = useState([]);
  const [favs, setFavs] = useState([]);


  useEffect(() => {
    initFavs(setFavs);
    initRecentlyViewed();
  }, [])


  async function initRecentlyViewed() {
    let ids = getRecentlyViewedProductsIds();
    if (ids.length == 0) return;

    setRecently(await getProductsFromIdsArray(ids));
  }

  function isCustomFavorite(id) {
    return isFavorite(id, favs);
  }


  return (
    <div>
      {/* <h5
        className="mb-3"
        style={{
          fontFamily: "var(--standart-font)",
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        пусто ехх
      </h5> */}
      <h4>Переглянуті</h4>
      <h6
        className="mb-4 mt-2"
        style={{ color: "rgba(122, 122, 122, 1)", fontSize: "14px" }}
      >
        {recently.length} результата по запиту
      </h6>

      <div className=" pe-2 ps-2 mb-3 d-flex justify-content-between ">
        <FilterData />
        <Filter />
      </div>

      <div>
        {/* Якщо історія не пуста  */}
        {
          recently && recently.length > 0 ?
            recently.map((a) => (
              <MiniProductCardComponent
                key={a.id}
                id={a.id}
                title={a.title}
                description={a.shortDescription}
                minPrice={a.minPrice}
                countOfPharmacies={a.count}
                manufacturer={a.manufacturer}
                imageUrl={a.pathToPhoto}
                isFavorite={isCustomFavorite}
              />
            )) :
            (<>

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

            </>)

        }
        {/* Якщо історія пуста */}

        {/* <img
          className="mt-3"
          src={srcImg}
          style={{ width: "100%", height: "auto" }}
        /> */}
      </div>
    </div>
  );
};

export default WathcList;
