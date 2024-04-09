import React, { useEffect, useContext, useState } from "react";
import "./Avatar.css";
import PropTypes from "prop-types";
import { getMyInfo } from "../../../services/user";
import CustomImgComponent from "../../../components/Common/CustomImgComponent/CustomImgComponent";
import { ApiPath, Success } from "../../../utils/Constants";
import photo from "../../../assets/images/download.jpg";

const AvatarComponennt = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {    
    init();
  }, []);

  
  async function init(){
    let userInfoFromServer = {};
    let res = await getMyInfo();
    if(res.status == Success){
      if(res.data.firstName && res.data.lastName){
        userInfoFromServer.name = `${res.data.firstName} ${res.data.lastName}`;
      }
      else{
        userInfoFromServer.name = res.data.email;
      }
      userInfoFromServer.role = res.data.role;
      userInfoFromServer.pathToPhoto = res.data.pathToPhoto;
      setUserInfo(userInfoFromServer);
    }
  }

  
  
  if(!userInfo)
  return <></>

  return (
    <div className="d-flex align-items-center">
      <CustomImgComponent 
      defaultSrc={photo}
      alt="Avatar"
      className="rounded-circle mr-3 avatar"
      src={`${ApiPath}${userInfo?userInfo.pathToPhoto:""}`}/>
      
      <div style={{ gap: '4px' }}>
        <div className="font-weight-bold font-size-lg text-dark nikname-text">{userInfo?userInfo.name:""}</div>
        <div className="font-size-sm text-secondary roll-text">{userInfo?userInfo.role:""}</div>
      </div>
    </div>
  );
};

// Avatar.propTypes = {
//   text: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   imageUrl: PropTypes.string.isRequired,
// };

export default AvatarComponennt;
