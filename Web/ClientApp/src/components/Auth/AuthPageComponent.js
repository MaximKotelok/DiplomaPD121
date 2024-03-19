import React, { useState,useEffect } from "react";
import MenuComponent from "../User/Pages/Profile/Components/MenuComponent/MenuComponent";
import LoginForm from "./LoginFormComponent/LoginForm";
import styles from "./AuthPage.module.css";
import RegistrationForm from "./RegistrationFormComponent/RegistrationForm";
import BtnSocialComponenent from "./components/BtnSocialComponenent/BtnSocialComponenent";
import google from "../../assets/images/google.svg";
import faceboo from "../../assets/images/Facebook.svg";
import authPage from "../../assets/images/authPage.png";
import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from "react-router-dom";
import { checkIsAuth } from "../../services/user";

var active = ({ isActive }) =>
  isActive
    ? ` ms-3 ${styles["navigation-h"]} ${styles["navigation-h-active"]}`
    : ` ms-3 ${styles["navigation-h"]}`;
    
const AuthPageComponent = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(checkIsAuth()){
       navigate("/profile");
  }
  },[]);

  return (
    <div
      className="row d-flex align-items-center "
      style={{ justifyContent: "end", margin: "0 0 200px 0" }}
    >
      <div className="col-12 col-md-12 col-lg-5  p-5 pt-2">
        <div className="mb-4 d-flex justify-content-center">
          <NavLink to="/auth/login" className={active}>
            Вхід
          </NavLink>

          <NavLink to="/auth/registration" className={active}>
            Реєстрація
          </NavLink>
        </div>

        <div className="form-container">
          <Outlet />
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
        <div style={{ maxWidth: "100%" }}>
          <img src={authPage} style={{ width: "100%", height: "auto" }} />
        </div>
      </div>
    </div>
  );
};

export default AuthPageComponent;
