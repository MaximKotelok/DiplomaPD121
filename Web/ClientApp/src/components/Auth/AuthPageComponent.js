import React, { useState } from "react";
import MenuComponent from "./components/MenuComponent/MenuComponent";
import LoginForm from "./LoginFormComponent/LoginForm";
import styles from "./AuthPage.module.css";
import RegistrationForm from "./RegistrationFormComponent/RegistrationForm";
import BtnSocialComponenent from "./components/BtnSocialComponenent/BtnSocialComponenent";
import google from "../../assets/images/google.svg";
import authPage from "../../assets/images/authPage.png";
import faceboo from "../../assets/images/Facebook.svg";
const AuthPageComponent = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleTabClick = (formType) => {
    setActiveForm(formType);
  };
  return (
    // <div className="input-group mb-3 center back-serach-bar">
    <div
      className="row d-flex align-items-center "
      style={{ justifyContent: "end", margin: "0 0 200px 0" }}
    >
      {/* <div
        className="col-12 col-md-6 col-lg-4 p-3"
        style={{ marginTop: "50px" }}
      >
        <MenuComponent />
      </div> */}

      <div className="col-12 col-md-12 col-lg-5  p-5 pt-2">
        <div className="mb-4 d-flex justify-content-center">
          <span
            // href="#"
            className={`me-4 ${styles["navigation-h"]} ${
              activeForm === "login" ? styles["navigation-h-active"] : ""
            }`}
            onClick={() => handleTabClick("login")}
          >
            Вхід
          </span>
          <span
            // href="#"
            className={`ms-3 ${styles["navigation-h"]} ${
              activeForm === "registration" ? styles["navigation-h-active"] : ""
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

        <div class="d-flex align-items-center justify-content-center mt-3 mb-3">
          <hr class="m-0 ms-1 w-100" />
          <p
            class="m-2 mt-0"
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "var(--standart-font)",
            }}
          >
            або
          </p>
          <hr class="m-0 me-1 w-100" />
        </div>

        <div className="mr-2 ">
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

      <div className="col-12 col-md-12 col-lg-7  ">
        <img src={authPage} height="100%" />
      </div>
    </div>
  );
};

export default AuthPageComponent;
