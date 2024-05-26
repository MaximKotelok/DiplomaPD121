import React from "react";
import "./FooterComponent.css";
import ios from "../../../../assets/images/footer-icons/ios.svg";
import playmarket from "../../../../assets/images/footer-icons/playmarket.svg";

import "./FooterMapComponent.css";
import { NavLink, useLocation } from "react-router-dom";
import AccordionQuestionAdaptationComponent from "../../../../components/Common/AccordionFooterAdaptationComponent/AccordionQuestionAdaptationComponent";
import { FooterLink } from "../FooterLinkComponentn/FooterLink";
import useWindowSize from "../../../../components/User/Pages/Profile/UseWindowSize";

const FooterComponent = () => {
  const location = useLocation();
  const { width } = useWindowSize();

  const isNotMapPath = location.pathname !== "/map";
  const isMobile = width <= 1199;
  const isMobile2 = width <= 768;

  const classAddaptationAccordeon = isNotMapPath
    ? "col-12 col-md-3 col-lg-3 mb-3 div-acordeon"
    : "col-12 col-md-3 col-lg-3 col-xl-4 mb-3 div-acordeon";

    
  const classAddaptationSocial = isNotMapPath
    ? "col-12 col-md-3 col-lg-3 pb-4"
    : "col-12 col-md-3 col-lg-3 col-xl-12 pb-4";

  return (
    <div className="">
      <footer>
        <div className="row top-div">
          {/* Section 1 */}
          {/* <div className={`col-12 col-md-4 col-lg-2 mb-3 div-acordeon section-1`}> */}
          <div
            className={`${classAddaptationAccordeon} div-acordeon section-1`}
          >
            <AccordionQuestionAdaptationComponent
              header="Користувачам"
              ulList={[
                { text: "Аптеки поблизу", href: "/", target: "" },
                { text: "Розширений пошук", href: "/", target: "" },
                { text: "Браковані серії", href: "/", target: "" },
                { text: "Доставка і оплата", href: "/", target: "" },
                { text: "Умови повернення", href: "/", target: "" },
              ]}
            />
          </div>

          {/* Section 2 */}
          {/* <div className={`col-12 col-md-4 col-lg-2 mb-3 div-acordeon section-2`}> */}
          <div className={`${classAddaptationAccordeon} section-2`}>
            <AccordionQuestionAdaptationComponent
              header="Інформація"
              ulList={[
                { text: "Про нас", href: "/", target: "" },
                { text: "Зворотній зв'язок", href: "/", target: "" },
                { text: "Контакти", href: "/", target: "" },
                { text: "Блог", href: "/", target: "" },
                { text: "Правила кібербезпеки", href: "/", target: "" },
              ]}
            />
          </div>

          {/* Section 3 */}
          <div
            className={`${classAddaptationAccordeon} div-acordeon section-3`}
          >
            {/* <div className={`col-12 col-md-4 col-lg-3 mb-3 div-acordeon section-3`}> */}
            <AccordionQuestionAdaptationComponent
              header="Партнерам"
              ulList={[
                { text: "Розмістити аптеку", href: "/", target: "" },
                {
                  text: "Особистий кабінет аптеки",
                  href: "/loginPharmacy",
                  target: "_blank",
                },
                { text: "Технічна документація", href: "/", target: "" },
                { text: "Наші партнери", href: "/", target: "" },
              ]}
            />
          </div>

          {/* Section 4 */}

          {/* <div className="col-12 col-md-12 col-lg-5 pb-4 d-flex  my-dflex-justyf-end  section-4"> */}
          <div className={`${classAddaptationSocial} d-flex   section-4`}>
            {/* <div className={`col-12 col-md-12 col-lg-5 pb-4 d-flex   section-4`}> */}
            <div
              className={`d-flex my-flex-aling-center  ${
                isNotMapPath ? "flex-column" : isMobile && "flex-column"
              }`}
            >
              <h5 className=" w-100">Завантажте додаток</h5>

              <div
                className={`d-flex my-flex-column-and-row`}
                // className={`d-flex ${isMobile ? "flex-column" : isMobile2? "flex-row":"flex-column" }`}
              >
                <div className=" my-ms-2 me-2 my-mb-3 ">
                  <img src={playmarket} />
                </div>

                <div className=" ">
                  <img src={ios} />
                </div>
              </div>
            </div>
          </div>

          {/* CAPSULA TEXT */}
          <div className="col-12 capsula">
            <div className="capsula-container unselectable">
              <span className="capsula-text">CAPSULE</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="row  py-4  bottom-div section-4 ">
          <div className="col-md-4 col-6 ">
            <NavLink className="link-body-emphasis" href="#">
              Угода користувача
            </NavLink>
          </div>
          <div className="col-md-4 col-6 div-center ">
            <NavLink className="link-body-emphasis" href="#">
              Політика конфіденційності
            </NavLink>
          </div>
          <div className="col-md-4 col-12 ">
            <NavLink className="link-body-emphasis" href="#">
              Політика щодо реклами і спонсорства
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default FooterComponent;
