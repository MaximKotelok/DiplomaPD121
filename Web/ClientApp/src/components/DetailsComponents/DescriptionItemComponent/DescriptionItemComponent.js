import React, { useEffect, useState } from "react";
import styles from "./DescriptionItemComponent.module.css"
import { Element } from "react-scroll";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";


const DescriptionItemComponent = ({ id, number, title, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Element key={id} name={id}
      className={`${styles["description"]} ${isActive && `${styles["active"]}`}`}
    >
      <div className="d-flex align-items-center">
        <div
          className={`${styles["side-text-header-victorina"]} ${styles["side-btn-togle-victorina"]} ${isOpen ? `${styles["collapsed"]}` : ""
            } `}
          style={{ width: "100%" }}
        >
          <div onClick={toggleAccordion} className={`${styles["accordion"]} container`}>
            <p>
              {title}
            </p>
            <h1>
              {
              `${
                number.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
                })
              }.`}</h1>

          </div>

          <div
            id={`collapse-${title.replace(/\s+/g, "")}`}
            className={`${styles["side-text-body-victorina"]} container`}
          >
            {children}
          </div>
        </div>
      </div>
    </Element>
  );
};

export default DescriptionItemComponent;
