import React, { useEffect, useState } from "react";
import styles from "./AcordeonTransformer.module.css";
import photo from "./tabler-icon-tag.svg";
import { ReactComponent as Arrow } from "./mingcute_arrow-up-line.svg";
import { Link } from "react-router-dom";

export const AcordeonTransformer = ({ img, text, link, last = false }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isOpen, setIsOpen] = useState(windowWidth <= 767.9 ? false : true);

  const toggleAccordion = () => {
    if (windowWidth <= 767.9) setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      if (newWidth <= 767.9) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Link to={link}
      className={`d-flex align-items-center   mt-3 mb-3 ${
        !last && !isOpen && styles["bordet-bottom"]
      }`}
      style={{
        minWidth: "180px",
        width: "100%",
        maxWidth: isOpen ? "300px" : "unset",
      }}
    >
      <img src={img} alt="photo" style={{width:"32px", height:"32px"}}/>
      <div className="ms-3">
        <h4
          className={`${styles["opus-text"]} ${
            !isOpen && styles["dispaly-show"]
          }`}
        >
        </h4>
        <h3 className={`${styles["header-text"]}`}>{text}</h3>
      </div>

      <div className={`ms-auto  ${isOpen && styles["dispaly-show"]} `}>
        <Arrow />
      </div>
    </Link>

    // <div
    //   className={`${styles["parent-side-accardion"]} ${
    //     isOpen ? styles["parent-container-bg"] : ""
    //   }`}
    // >
    //   <div className="d-flex align-items-center">
    //     <div
    //       className={`row ${styles["side-text-header-victorina"]} ${
    //         styles["side-btn-togle-victorina"]
    //       } ${isOpen ? styles["collapsed"] : ""} `}
    //       style={{ width: "100%", margin: "0" }}
    //     >
    //       <div className="col-11">
    //         <div onClick={toggleAccordion}>
    //           <div
    //             className={`mt-1 ${styles["hd-text"]}  ${
    //               isOpen ? styles["hd-text-active"] : ""
    //             } `}
    //           >
    //             header
    //             {/* {header} */}
    //           </div>
    //         </div>

    //         <div
    //           // id={`collapse-${title.replace(/\s+/g, "")}`}
    //           className={` mt-2 ${styles["side-text-body-victorina"]} `}
    //           style={{ padding: "0" }}
    //         >
    //           <ul className={` nav flex-column`}>
    //             {/* {ulList.map((item, index) => (
    //                 <FooterLink

    //                   href={typeof item === "object" ? item.href : "#"}
    //                   text={typeof item === "object" ? item.text : item}
    //                   target={
    //                     typeof item === "object" && item.target ? item.target : ""
    //                   }
    //                 />
    //               ))} */}
    //             dslkgjdslkjg d;fgjldfksjg lksdjf dfljglsdkfjlgkjdfklgjdfjdfjgl
    //           </ul>
    //         </div>
    //       </div>

    //       {windowWidth <= 767.9 ? (
    //         <div className="col-1 d-flex align-items-center justify-content-end p-0">
    //           <button
    //             onClick={toggleAccordion}
    //             data-bs-target={id}
    //             className={` ${styles["collapsed"]}  ${styles["side-btn-togle-victorina"]}  ${styles["btn-displplay"]}}`}
    //             type="button"
    //             //   =
    //             aria-expanded={isOpen}
    //           >
    //             {/* {!isOpen ? (
    //                 <PlusVictorina
    //                   data-bs-target={id}
    //                   className={` ${styles["svg-victorina"]} ${
    //                     styles["sidetoggleButton"]
    //                   } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
    //                 />
    //               ) : (
    //                 <MinusVictorina
    //                   data-bs-target={id}
    //                   className={` ${styles["svg-victorina"]} ${
    //                     styles["sidetoggleButton"]
    //                   } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
    //                 />
    //               )} */}
    //           </button>
    //         </div>
    //       ) : null}
    //     </div>
    //   </div>
    // </div>
  );
};

// import { ReactComponent as LogoSvb } from "../../../assets/images/what.svg";
// import { ReactComponent as PlusVictorina } from "../../../assets/images/plusVictorina.svg";
// import { ReactComponent as MinusVictorina } from "../../../assets/images/minusVictorina.svg";
// import { FooterLink } from "../../../layouts/UserLayout/Footer/FooterLinkComponentn/FooterLink";
// import { ReactComponent as Dowthrow } from "../../../assets/images/dow.svg";

// const AccordionQuestionAdaptationComponent = ({
//   id = "1",
//   ulList = [{ text: "", href: "", target: "" }],
//   header = "Загаловок",
// }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const [isOpen, setIsOpen] = useState(windowWidth <= 767.9 ? false : true);

//   const toggleAccordion = () => {
//     if (windowWidth <= 767.9) setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       setWindowWidth(newWidth);
//       if (newWidth <= 767.9) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div
//       className={`${styles["parent-side-accardion"]} ${
//         isOpen ? styles["parent-container-bg"] : ""
//       }`}
//     >
//       <div className="d-flex align-items-center">
//         <div
//           className={`row ${styles["side-text-header-victorina"]} ${
//             styles["side-btn-togle-victorina"]
//           } ${isOpen ? styles["collapsed"] : ""} `}
//           style={{ width: "100%", margin: "0" }}
//         >
//           <div className="col-11">
//             <div onClick={toggleAccordion}>
//               <div
//                 className={`mt-1 ${styles["hd-text"]}  ${
//                   isOpen ? styles["hd-text-active"] : ""
//                 } `}
//               >
//                 {header}
//               </div>
//             </div>

//             <div
//               // id={`collapse-${title.replace(/\s+/g, "")}`}
//               className={` mt-2 ${styles["side-text-body-victorina"]} `}
//               style={{ padding: "0" }}
//             >
//               <ul className={` nav flex-column`}>
//                 {ulList.map((item, index) => (
//                   <FooterLink

//                     href={typeof item === "object" ? item.href : "#"}
//                     text={typeof item === "object" ? item.text : item}
//                     target={
//                       typeof item === "object" && item.target ? item.target : ""
//                     }
//                   />
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {windowWidth <= 767.9 ? (
//             <div className="col-1 d-flex align-items-center justify-content-end p-0">
//               <button
//                 onClick={toggleAccordion}
//                 data-bs-target={id}
//                 className={` ${styles["collapsed"]}  ${styles["side-btn-togle-victorina"]}  ${styles["btn-displplay"]}}`}
//                 type="button"
//                 //   =
//                 aria-expanded={isOpen}
//               >
//                 {!isOpen ? (
//                   <PlusVictorina
//                     data-bs-target={id}
//                     className={` ${styles["svg-victorina"]} ${
//                       styles["sidetoggleButton"]
//                     } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
//                   />
//                 ) : (
//                   <MinusVictorina
//                     data-bs-target={id}
//                     className={` ${styles["svg-victorina"]} ${
//                       styles["sidetoggleButton"]
//                     } ${isOpen ? styles["strow-dow"] : styles["strow-left"]}`}
//                   />
//                 )}
//               </button>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccordionQuestionAdaptationComponent;
