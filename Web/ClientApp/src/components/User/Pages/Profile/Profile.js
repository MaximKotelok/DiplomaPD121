import React, { useEffect, useContext, useState } from "react";
import styles from "./Profile.module.css";
import { Outlet } from "react-router-dom";
import MenuComponent from "./Components/MenuComponent/MenuComponent";
import AvatarComponent from "./Components/AvataComponent/AvatarComponent";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../../../../services/user";
import { ToastContainer } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();  
  useEffect(() => {
    if (!checkIsAuth()) navigate("/auth");    
  }, []);

  return (
    <div className="row mb-5">
      <div className="col-4">
        <AvatarComponent />
        <MenuComponent />
      </div>

      <div className="col-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
