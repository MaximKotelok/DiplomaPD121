import React from "react";
import "./FooterComponent.css";
import ios from "../../../../assets/images/footer-icons/ios.svg";
import playmarket from "../../../../assets/images/footer-icons/playmarket.svg";
import "./FooterMapComponent.css";
import { NavLink } from "react-router-dom";
import AccordionQuestionAdaptationComponent from "../../../../components/Common/AccordionFooterAdaptationComponent/AccordionQuestionAdaptationComponent";
import { FooterLink } from "../FooterLinkComponentn/FooterLink";

const FooterComponent = () => (
  <div className="">
    <footer>
      <div className="row top-div">
        {/* Section 1 */}
        <div className="col-12 col-md-4 col-lg-2 mb-3 div-acordeon section-1">
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
        <div className="col-12 col-md-4 col-lg-2 mb-3 div-acordeon section-2">
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
        <div className="col-12 col-md-4 col-lg-3 mb-3 div-acordeon section-3">
       
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

        <div className="col-12 col-md-12 col-lg-5 d-flex  my-dflex-justyf-end  section-4">
          <div className="d-flex flex-column">
            <h5 className=" w-100">Завантажте додаток</h5>
            <div className=" d-flex flex-row">
              <div className=" me-2 ">
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

      <div
        style={{ margin: "20px 0" }}
        className="row  py-4  bottom-div section-4 "
      >
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

export default FooterComponent;
