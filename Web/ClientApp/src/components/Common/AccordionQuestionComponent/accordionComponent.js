import React, { useEffect, useState } from "react";
import styles from "./accordionQuestion.module.css";

import { ReactComponent as LogoSvb } from "../../../assets/images/what.svg";
import { ReactComponent as PlusVictorina } from "../../../assets/images/plusVictorina.svg";
import { ReactComponent as MinusVictorina } from "../../../assets/images/minusVictorina.svg";
// import { ReactComponent as Dowthrow } from "../../../assets/images/dow.svg";

const AccordionComponent = ({
  id = "1",
  title = "text",
  header = "Загаловок",
  buttonLocation = "justify-content-end",
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     setupAccordion();

  //     return () => {
  //       // eslint-disable-next-line no-undef
  //       $(".toggleButton").off("click");
  //     };
  //   }, []);

  return (
    <div
      className={`${styles["parent-side-accardion"]} ${
        isOpen ? styles["parent-container-bg"] : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // style={buttonStyle}
    >
      <div className="d-flex align-items-center">
        <div
          className={`row ${styles["side-text-header-victorina"]} ${
            styles["side-btn-togle-victorina"]
          } ${isOpen ? styles["collapsed"] : ""} `}
          style={{ width: "100%" }}
        >
          <div
            className={`col-1 d-flex align-items-center justify-content-center p-0 ${styles["ps-my-s-10"]} `}
          >
            <LogoSvb className="" />
          </div>

          <div className="col-10">
            <div
              onClick={toggleAccordion}
              // className="d-flex align-items-center "
            >
              <div
                className={`mt-1 ${styles["hd-text"]}  ${
                  isOpen ? styles["hd-text-active"] : ""
                } `}
              >
                {header}
              </div>
            </div>

            <div
              id={`collapse-${title.replace(/\s+/g, "")}`}
              className={` ${styles["side-text-body-victorina"]} `}
              style={{ padding: "0" }}
            >
              <hr className={`${styles["hr-cordeon"]}`} />
              <p className={`${styles["text-body-victorina"]}`}>{title}</p>
            </div>
          </div>

          <div
            className={`col-1 d-flex align-items-center ${buttonLocation} p-0`}
          >
            <button
              onClick={toggleAccordion}
              data-bs-target={id}
              className={` ${styles["sidetoggleButton"]}  ${styles["collapsed"]}  ${styles["side-btn-togle-victorina"]} `}
              type="button"
              //   =
              aria-expanded={isOpen}
              aria-controls={`collapse-${title.replace(/\s+/g, "")}`}
            >
              {!isOpen ? (
                <PlusVictorina
                  data-bs-target={id}
                  className={` ${styles["svg-victorina"]} ${
                    styles["sidetoggleButton"]
                  } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
                />
              ) : (
                <MinusVictorina
                  data-bs-target={id}
                  className={` ${styles["svg-victorina"]} ${
                    styles["sidetoggleButton"]
                  } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
                />
              )}
              {/* <PlusVictorina
                data-bs-target={id}
                className={` ${styles["svg-victorina"]} ${
                  styles["sidetoggleButton"]
                } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
              /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionComponent;

// import React, { useState } from "react";
// import "./AccordionSideMenu.css"; // Створіть файл Accordion.css для стилізації

// const AccordionSideMenuComponnent = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleAccordion = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`accordion-item ${isCollapsed ? "collapsed" : ""}`}>
//       <h2 className="accordion-header">
//         <button
//           className="accordion-button"
//           type="button"
//           onClick={toggleAccordion}
//         >
//           Accordion Item #1
//         </button>
//       </h2>
//       <div className="accordion-body">
//         <strong>This is the first item's accordion body.</strong> It is shown by
//         <code>.accordion-body</code>, though the transition does limit overflow.
//       </div>
//     </div>
//   );
// };
// export default AccordionSideMenuComponnent;
