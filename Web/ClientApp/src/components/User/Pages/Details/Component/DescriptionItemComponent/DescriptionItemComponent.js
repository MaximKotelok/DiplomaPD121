import React, { useEffect, useState } from "react";
import styles from "./DescriptionItemComponent.module.css";
import { Element } from "react-scroll";
import { toTwoDigitsNumber } from "../../../../../../utils/Functions";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";

const DescriptionItemComponent = ({
  id,
  number,
  title,
  children,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Element
      key={id}
      name={id}
      className={`${styles["description"]} ${
        isActive && `${styles["active"]}`
      }`}
    >
      <div className="d-flex align-items-center">
        <div
          className={`${styles["side-text-header-victorina"]} ${
            styles["side-btn-togle-victorina"]
          } ${isOpen ? `${styles["collapsed"]}` : ""} `}
          style={{ width: "100%" }}
        >
          <div
            onClick={toggleAccordion}
            className={`${styles["accordion"]} container`}
          >
            <p style={{ lineHeight: "20px" }}>{title}</p>
            <h1>{`${toTwoDigitsNumber(number)}.`}</h1>
          </div>

          <div
            id={`collapse-${title.replace(/\s+/g, "")}`}
            className={`${styles["side-text-body-victorina"]} container`}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default DescriptionItemComponent;
