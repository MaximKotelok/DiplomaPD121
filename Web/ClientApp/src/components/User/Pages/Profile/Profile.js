import React, { useEffect, useContext, useState } from "react";
import styles from "./Profile.module.css";
import { Outlet, useLocation } from "react-router-dom";
import MenuComponent from "./Components/MenuComponent/MenuComponent";
import AvatarComponent from "./Components/AvataComponent/AvatarComponent";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../../../../services/user";
import { ToastContainer } from "react-toastify";
import useWindowSize from "./UseWindowSize.js";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkIsAuth()) navigate("/auth");
  }, []);

  const location = useLocation();
  const { pathname } = location;

  // Перевірка шляху
  const isProfilePage = pathname === "/profile";
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  return (
    <div>
      {isMobile ? (
        <div className="row mb-5">
          {isProfilePage ? (
            <div className="col-12 col-md-4">
              <AvatarComponent />
              <MenuComponent />
            </div>
          ) : (
            <div className="col-12 col-md-8">
              <Outlet />
            </div>
          )}
        </div>
      ) : (
        <div className="row mb-5">
          <div className="col-12 col-md-4">
            <AvatarComponent />
            <MenuComponent />
          </div>

          <div className="col-12 col-md-8">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
