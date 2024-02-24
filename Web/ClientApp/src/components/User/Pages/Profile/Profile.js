import React, { useEffect, useContext } from "react";
import styles from "./Profile.module.css";
import { Outlet } from "react-router-dom";
import MenuComponent from "./Components/MenuComponent/MenuComponent";
import AvatarComponent from "./Components/AvataComponent/AvatarComponent";

const Profile = () => {
  return (
    <div className="row mb-4">

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
