import React, { useEffect, useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as BtnEditProfile } from "../../../../../../assets/images/profile/EditProfile.svg";
import photo from "../../../../../../assets/images/user/user-photo-default.svg";

import styles from "./Avatat.module.css";
import { ApiPath, Success } from "../../../../../../utils/Constants";
import { getMyInfo } from "../../../../../../services/user";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
const AvatarComponent = () => {
  const [name, setName] = useState("");
  const [pathToPhoto, setPathToPhoto] = useState("");
  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await getMyInfo();
    if (res.status == Success) {
      if (res.data.firstName && res.data.lastName)
        setName(`${res.data.firstName} ${res.data.lastName}`);
      else setName(res.data.email);

      setPathToPhoto(res.data.pathToPhoto);
    }
  }
  return (
    <div className="d-flex  justify-content-between align-items-center mb-3">
      <div className="d-flex  align-items-center">
        <CustomImgComponent
          defaultSrc={photo}
          alt="Avatar"
          className={` ${styles["circle-avatar"]} `}
          src={`${ApiPath}${pathToPhoto}`}
        />

        <p className={`ms-3  ${styles["name-user"]}`}>{name}</p>
      </div>
      <Link to="/profile/edit">
        <BtnEditProfile className={`${styles["style-icon"]}`} />
      </Link>
    </div>
  );
};

export default AvatarComponent;
