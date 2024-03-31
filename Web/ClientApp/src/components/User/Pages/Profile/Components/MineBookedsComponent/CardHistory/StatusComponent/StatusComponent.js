import React, { useEffect, useContext } from "react";
import styles from "./Status.module.css";
import { ApiPath, PhotoPath } from "../../../../../../../../utils/Constants";

const StatusComponent = ({ color, pathToPhoto, text }) => {
  console.log(ApiPath+"/"+pathToPhoto)
  return (
    <div
      className="d-flex align-items-center "
      style={{
        border: `1px solid ${color}`,
        borderRadius: "56px",
        width: "max-content",
        padding: "6px 12px",
      }}
    >
      <div
        style={{
          // borderRadius: "100px",
          // //   backgroundColor: "Red",
          // backgroundColor: `${color}`,
          // width: "20px",
          // height: "20px",
        }}
        className=" d-flex justify-content-center  align-items-center"
      >
       <img src={`${ApiPath}${pathToPhoto}`}/>
      </div>

      <p
        className={`ms-2 ${styles["text-status"]}`}
        style={{ color: `${color}` }}
      >
        {text}
      </p>
    </div>
  );
};

export default StatusComponent;
