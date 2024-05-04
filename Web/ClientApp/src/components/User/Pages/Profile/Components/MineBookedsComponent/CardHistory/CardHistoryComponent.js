import React, { useEffect, useContext } from "react";
import styles from "./CardHistory.module.css";
import StatusComponent from "./StatusComponent/StatusComponent";

import { ReactComponent as Znakokloko } from "../../../../../../../assets/images/znakokl.svg";

const CardHistory = ({
  name,
  number,
  price,
  date,
  address,
  statusText,
  statusPathToPhoto,
  statusColor,
}) => {
  return (
    <div className={`row ${styles["peren-card-history"]} mb-3 `}>
      <div className="col-6 ps-0 ms-0">
        <p>
          <StatusComponent
            color={statusColor}
            text={statusText}
            pathToPhoto={statusPathToPhoto}
          />
        </p>

        <p
          className={`d-flex align-items-center mt-3 mb-1  ${styles["text-name"]}`}
        >
          {name}

          <span className="ms-2">
            <Znakokloko />
          </span>
        </p>

        <p className={`${styles["text-adress"]} mt-3`}>{address}</p>
      </div>

      <div className="col-6 row m-0 p-0">
        <div
          className={`col-12 col-md-6 d-flex align-items-center justify-content-end ${styles["text-Number"]}`}
        >
          <p>
            <span>№</span> {number}
          </p>
        </div>

        <div
          className={`col-12 col-md-6 d-flex  flex-column align-items-end  justify-content-center`}
        >
          <p className={`${styles["text-Number"]} mb-3`}>
            {price} <span>грн</span>
          </p>
          <p className={` text-nowrap ${styles["text-data"]}`}>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
