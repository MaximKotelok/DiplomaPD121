import React, { useEffect, useState } from "react";
import styles from "./MedicineTableComponent.module.css"
import { Element } from "react-scroll";
import { toTwoDigitsNumber } from "../../../../../../utils/Functions";
import { getAllPermissions } from "../../../../../../services/permissionType";
import { ApiPath, StateInfos, Success } from "../../../../../../utils/Constants";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";


const MedicineTableComponent = ({ data }) => {
  const [loader, setLoader] = useState(StateInfos.LOADING)
  const [permissions, setPermissions] = useState([]);
  
  useEffect(() => {
    init();
  }, []);

  async function init(){
    let res = await getAllPermissions();    
    if (res.status === Success){
      setPermissions(res.data);
      setLoader(StateInfos.LOADED);
    }
  }

  function getPermission(id){
    console.log(permissions)
    return permissions.find(a=>a.id === id)
  }

  if (loader !== StateInfos.LOADED)
    return (<></>);
  return (
    <div>
      <p className="section-title">Особливості застосування</p>
      <div className={`${styles["table"]}`}>
        {data.map((a, index) =>
          <div key={index} className={`col-5 ${styles["table-item"]}`}>            
              <span className={`col-6`}>{a.description}</span>
              <div className={`${styles["block"]} col-6`}>
                <img className={`${styles["image"]}`} src={`${ApiPath}${getPermission(a.id).pathToPhoto}`} alt="icon" />
                <span className={`${styles["permission-title"]}`}>{getPermission(a.id).title}</span>
              </div>            
          </div>)}
      </div>
    </div>
  );
};

export default MedicineTableComponent;
