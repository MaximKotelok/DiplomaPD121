import React, { useEffect, useContext,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as BtnEditProfile } from "../../../../../../assets/images/EditProfile.svg";
import photo from "../../../../../../assets/images/download.jpg";

import styles from "./Avatat.module.css";
import { Success } from "../../../../../../utils/Constants";
import { getMyInfo } from "../../../../../../services/user";
const AvatarComponent = () => {
  const [name, setName] = useState("");
  useEffect(() => {    
    init();
  }, []);

  
  async function init(){
    let res = await getMyInfo();
    if(res.status == Success){
      if(res.data.firstName && res.data.lastName)
        setName(`${res.data.firstName} ${res.data.lastName}`)
      else
      setName(res.data.email)
    }
  }
  return (
    <div className="d-flex  justify-content-between align-items-center mb-3">
      <div className="d-flex  align-items-center">
        <img src={photo} className={` ${styles["circle-avatar"]} `} />
        <p className={`ms-3  ${styles["name-user"]}`}>{name}</p>
      </div>
      <Link to="/profile/edit">
        <BtnEditProfile />
      </Link>
    </div>
  );
};

export default AvatarComponent;
