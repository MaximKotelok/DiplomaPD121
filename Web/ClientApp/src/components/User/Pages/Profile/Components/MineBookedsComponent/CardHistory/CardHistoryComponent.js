import React, { useEffect, useContext } from "react";
import styles from "./CardHistory.module.css";
import StatusComponent from "./StatusComponent/StatusComponent";

import { ReactComponent as Znakokloko } from "../../../../../../../assets/images/znakokl.svg";

const CardHistory = ({
  name = "Аптека зі",
  number = "32421421",
  price = "232",
  data = "23.12.2022 в 00:21",
}) => {
  return (
    <div className={`row ${styles["peren-card-history"]} mb-3 `}>
      <div className="col-6">
        <p>
          <StatusComponent color="rgba(59, 164, 42, 1)" />
        </p>

        <p
          className={`d-flex align-items-center mt-3 mb-1  ${styles["text-name"]}`}
        >
          {name}

          <span className="ms-2">
            <Znakokloko />
          </span>
        </p>

        <p className={`${styles["text-adress"]}`}>вул. Любінська 104, Львів</p>
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
        <p className={`${styles["text-data"]}`}>{data}</p>
      </div>
    </div>
  );
};

export default CardHistory;
