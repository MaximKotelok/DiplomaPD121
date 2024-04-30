import React, { useEffect, useState } from "react";
import "./AccordionSideMenu.css";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";
import { ReactComponent as LogoSvb } from "../../../assets/images/samsungpass.svg";
import { ReactComponent as Dowthrow } from "../../../assets/images/dow.svg";
import { NavLink } from "react-router-dom";

const AccordionSideMenuComponent = ({
  ListMenejment = [],
  id,
  title,
  content,
  isActive,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  // const [rows, setRows] = React.useState([]);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

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
      className="parent-side-accardion div-accardion-hover"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // style={buttonStyle}
    >
      <div className="d-flex align-items-center">
        <div
          className={`side-text-header-victorina side-btn-togle-victorina ${
            isOpen ? "collapsed div-active-acordeon" : ""
          } `}
          style={{ width: "100%" }}
        >
          {/* //  <button
        //     data-bs-target={id}
        //     className={`sideToggleButton side-text-header-victorina side-btn-togle-victorina ${
        //       isOpen ? "" : "collapsed"
        //     }`}
        //     type="button"
        //     onClick={toggleAccordion}
        //     aria-expanded={isOpen}
        //     aria-controls={`collapse-${title.replace(/\s+/g, "")}`}
        //   > */}
          <div
            onClick={toggleAccordion}
            className="d-flex align-items-center block-hover"
          >
            <LogoSvb className="me-3" /> <div>Менеджмент</div>
            <button
              data-bs-target={id}
              className=" sidetoggleButton collapsed side-btn-togle-victorina"
              type="button"
              //   =
              aria-expanded={isOpen}
              aria-controls={`collapse-${title.replace(/\s+/g, "")}`}
            >
              <Dowthrow
                data-bs-target={id}
                className={`svg-victorina sidetoggleButton ${
                  isOpen ? "strow-dow" : "strow-left"
                }`}
              />
            </button>
          </div>

          {/* //  </button> */}
          <div
            id={`collapse-${title.replace(/\s+/g, "")}`}
            // className={`accordion-collapse collapse side-text-body-victorina   ${
            className={`  side-text-body-victorina `}
          >
            {ListMenejment.map((item, index) => (
              <NavLink

              className={({ isActive }) =>
              `w-100 d-flex text-body-victorina ${
                isActive && "active-nav-admin-menejment"
              }`
            }
                to={item.link}
                // className="w-100 d-flex text-body-victorina "
              >
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionSideMenuComponent;

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
