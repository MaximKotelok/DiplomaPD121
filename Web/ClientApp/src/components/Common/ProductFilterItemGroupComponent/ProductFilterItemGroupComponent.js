import React, { useEffect, useState } from "react";
import styles from "./ProductFilterItemGroupComponent.module.css"
import { Element } from "react-scroll";
import { toTwoDigitsNumber } from "../../../utils/Functions";
import unwrapIcon from "../../../assets/images/unwrap.svg"
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";


const ProductFilterItemGroupComponent = ({ id, title, children, isOpenByDefault=false }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Element key={id} name={id}>
      <div className="d-flex align-items-center">
        <div
          className={`${styles["side-text-header-victorina"]} ${styles["side-btn-togle-victorina"]} ${isOpen ? `${styles["collapsed"]}` : ""
            } `}
          style={{ width: "100%" }}
        >
          <div onClick={toggleAccordion} className={`${styles["accordion"]}`}>
            <p>
              {title}
            </p>            
            {!isOpen && <img src={unwrapIcon}/>}
          </div>

          <div
            id={`collapse-${title.replace(/\s+/g, "")}`}
            className={`${styles["side-text-body-victorina"]}`}
          >
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default ProductFilterItemGroupComponent;
