import React from 'react';
import './FooterComponent.css';
import ios from "../../../../assets/images/footer-icons/ios.svg";
import playmarket from "../../../../assets/images/footer-icons/playmarket.svg";

const FooterLink = ({ href, text }) => (
    <li className="nav-item mb-2">
        <a href={href} className="nav-link p-0 text-dark">
            {text}
        </a>
    </li>
);

const FooterComponent = () => (
    <div  className="">
        <footer className="">
            <div className="row top-div" >
                {/* Section 1 */}                
                <div className="col-6 col-md-2 mb-3">
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
                <div className="col-6 col-md-2 mb-3">
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
                <div className="col-6 col-md-4 mb-3">
                    <h5>Партнерам</h5>
                    <ul className="nav flex-column">
                        <FooterLink href="#" text="Розмістити аптеку" />
                        <FooterLink href="#" text="Особистий кабінет аптеки" />
                        <FooterLink href="#" text="Технічна документація" />
                        <FooterLink href="#" text="Наші партнери" />
                    </ul>
                </div>

                {/* Section 4 */}
                
                <div className="col-6 col-md-3 offset-md-1 mb-3 d-flex flex-column align-items-start">
                    <h5 style={{ textAlign: "end" }}>Завантажити додаток</h5>

                    <div className="row">
                        <div className="col-6" >
                            <img src={playmarket}/>
                        </div>
                        <div className="col-6" >
                        <img src={ios}/>
                        </div>
                    </div>

                </div>
                {/* Section 3 */}
                <div className="col-12">
                    <div className="capsula-container unselectable">
                        <span className="capsula-text">CAPSULE</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="d-flex  py-4  bottom-div ">
                <ul className="list-unstyled d-flex bottom-ul">
                    <li className="ms-3 bottom-li border-li">
                        <a className="link-body-emphasis" href="#">
                            Угода користувача
                        </a>
                    </li>
                    <li className="ms-3 bottom-li border-li">
                        <a className="link-body-emphasis" href="#">
                            Політика конфіденційності
                        </a>
                    </li>
                    <li className="ms-3 bottom-li">
                        <a className="link-body-emphasis" href="#">
                            Політика щодо реклами і спонсорства
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
);

export default FooterComponent;
