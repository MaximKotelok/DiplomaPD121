import React, { useEffect, useContext } from "react";
import styles from "./SelectedProducts.module.css";
import FilterData from "./FilterDataComponent/FilterData";
import Filter from "./FilterComponent/Filter";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import srcImg from "../../../../../../assets/images/authPage.png";

const SelectedProducts = () => {
  return (
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

      <div>
        {/* Якщо історія не пуста  */}
        {/* Макс тут доробиш ті карточки */}

        {/* <MiniProductCardComponent
          key="1"
          id="1"
          isFavorit="1"
          title="1"
          description="1"
          minPrice="1"
          countOfPharmacies="1"
          manufacturer="1"
          imageUrl="1"
        /> */}

        {/* Якщо історія пуста */}
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
    </div>
  );
};

export default SelectedProducts;
