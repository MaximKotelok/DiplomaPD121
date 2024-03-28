import React from "react";
import "./FooterComponent.css";
import ios from "../../../../assets/images/footer-icons/ios.svg";
import playmarket from "../../../../assets/images/footer-icons/playmarket.svg";
import "./FooterMapComponent.css";
import { NavLink } from "react-router-dom";

const FooterLink = ({ href, text, target = "" }) => (
  <li className="nav-item mb-2">
    <NavLink target={target} to={href} className="nav-link p-0 text-dark">
      {text}
    </NavLink>
  </li>
);

const FooterComponent = () => (
  <div className="">
    <footer>
      <div className="row top-div">
        {/* Section 1 */}
        <div className="col-12 col-md-4 col-lg-2 mb-3 section-1">
          <h5>Користувачам</h5>
          <ul className="nav flex-column">
            <FooterLink href="#" text="Аптеки поблизу" />
            <FooterLink href="#" text="Розширений пошук" />
            <FooterLink href="#" text="Браковані серії" />
            <FooterLink href="#" text="Доставка і оплата" />
            <FooterLink href="#" text="Умови повернення" />
          </ul>
        </div>

        {/* Section 2 */}
        <div className="col-12 col-md-4 col-lg-2 mb-3 section-2">
          <h5>Інформація</h5>
          <ul className="nav flex-column">
            <FooterLink href="#" text="Про нас" />
            <FooterLink href="#" text="Зворотній зв'язок" />
            <FooterLink href="#" text="Контакти" />
            <FooterLink href="#" text="Блог" />
            <FooterLink href="#" text="Правила кібербезпеки" />
          </ul>
        </div>

        {/* Section 3 */}
        <div className="col-12 col-md-4 col-lg-3 mb-3 section-3">
          <h5>Партнерам</h5>
          <ul className="nav flex-column">
            <FooterLink href="#" text="Розмістити аптеку" />
            <FooterLink
              target="_blank"
              href="/loginPharmacy"
              text="Особистий кабінет аптеки"
            />
            <FooterLink href="#" text="Технічна документація" />
            <FooterLink href="#" text="Наші партнери" />
          </ul>
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
        style={{ margin: "10px 0" }}
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
