import React, { useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as BtnEditProfile } from "../../../../../../assets/images/EditProfile.svg";
import photo from "../../../../../../assets/images/download.jpg";

import styles from "./Avatat.module.css";
const AvatarComponent = () => {
  return (
    <div className="d-flex  justify-content-between align-items-center mb-3">
      <div className="d-flex  align-items-center">
        <img src={photo} className={` ${styles["circle-avatar"]} `} />
        <p className={`ms-3  ${styles["name-user"]}`}>Олег Мельник</p>
      </div>
      <Link to="/profile/edit">
        <BtnEditProfile />
      </Link>
    </div>
  );
};

export default AvatarComponent;
