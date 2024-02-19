import React, { useState } from "react";
import MenuComponent from "./components/MenuComponent/MenuComponent";
import LoginForm from "./LoginFormComponent/LoginForm";
import styles from "./AuthPage.module.css";
import RegistrationForm from "./RegistrationFormComponent/RegistrationForm";
import BtnSocialComponenent from "./components/BtnSocialComponenent/BtnSocialComponenent";
import google from "../../assets/images/google.svg";
import faceboo from "../../assets/images/Facebook.svg";
import ProductFilterComponent from "../Common/ProductFilterComponent/ProductFilterComponent";
const AuthPageComponent = () => {
    const [activeForm, setActiveForm] = useState("login");

    const handleTabClick = (formType) => {
        setActiveForm(formType);
    };
    return (
        // <div className="input-group mb-3 center back-serach-bar">
        <div

            className="row"
            style={{ justifyContent: "end", margin: "0 0 200px 0" }}
        >
            <div
                className="col-12 col-md-6 col-lg-4 p-3"
                style={{ marginTop: "50px" }}
            >
                <MenuComponent />
            </div>

            <div className="col-12 col-md-6 col-lg-4 p-3">
                <div className="mb-4">
                    <span
                        // href="#"
                        className={`me-3 ${styles["navigation-h"]} ${activeForm === "login" ? styles["navigation-h-active"] : ""
                            }`}
                        onClick={() => handleTabClick("login")}
                    >
                        Вхід
                    </span>
                    <span
                        // href="#"
                        className={`${styles["navigation-h"]} ${activeForm === "registration" ? styles["navigation-h-active"] : ""
                            }`}
                        onClick={() => handleTabClick("registration")}
                    >
                        Реєстрація
                    </span>
                </div>

                <div className="form-container">
                    {activeForm === "login" && <LoginForm />}
                    {activeForm === "registration" && <RegistrationForm />}
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 p-3">
                <div className="mb-3">
                    <span className={`${styles["login-social-text"]} `}>
                        Увійти через:
                    </span>
                </div>
                <div className="mb-3">
                    <BtnSocialComponenent icon={google} text={"Вхід через Google"} />
                    <BtnSocialComponenent icon={faceboo} text={"Вхід через Facebook"} />
                </div>
                <div>
                    <a href="#" className={`${styles["login-ugota-text"]} `}>
                        Угода про конфіденційність:
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthPageComponent;
