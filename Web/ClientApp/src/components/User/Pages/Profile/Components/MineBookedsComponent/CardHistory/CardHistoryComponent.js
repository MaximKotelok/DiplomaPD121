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
  statusColor
}) => {
  return (
    <div className={`row ${styles["peren-card-history"]} mb-3 `}>
      <div className="col-6">
        <p>
          <StatusComponent color={statusColor} text={statusText} pathToPhoto={statusPathToPhoto} />
        </p>

        <p
          className={`d-flex align-items-center mt-3 mb-1  ${styles["text-name"]}`}
        >
          {name}

          <span className="ms-2">
            <Znakokloko />
          </span>
        </p>

        <p className={`${styles["text-adress"]}`}>{address}</p>
      </div>

      <div
        className={`col-3 d-flex align-items-center justify-content-end ${styles["text-Number"]}`}
      >
        <p>
          <span>№</span> {number}
        </p>
      </div>

      <div
        className={`col-3 d-flex  flex-column align-items-end  justify-content-center`}
      >
        <p className={`${styles["text-Number"]} mb-1`}>
          {price} <span>грн</span>
        </p>
        <p className={`${styles["text-data"]}`}>{date}</p>
      </div>
    </div>
  );
};

export default CardHistory;
