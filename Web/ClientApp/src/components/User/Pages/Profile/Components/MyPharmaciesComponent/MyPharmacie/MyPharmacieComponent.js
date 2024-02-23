import React from "react";
import styles from "./MyPharmacie.module.css";
import { ReactComponent as BtnDump } from "../../../../../../../assets/images/Dump.svg";
import { ReactComponent as MapCard } from "../../../../../../../assets/images/MapCard.svg";
const MyPharmacie = () => {
  return (
    <div className={`col-6 p-2`}>
      <div className={`${styles["perent-card-pharmacie"]}`}>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className={` ${styles["text-h6-bottom"]}`}>
              Аптека подорожник
            </h6>
            <p className={`${styles["text-p-card"]}`}>Зачиниться о 21:00</p>
          </div>

          <div className="d-flex justify-content-end">
            <BtnDump />
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-between  align-items-center">
          <div>
            <p className={`${styles["text-p-card"]} mb-2`}>
              Пн-Пт: 7:30 - 21:00
            </p>
            <p className={`${styles["text-p-card"]}`}>Сб-Нд: 8:00 - 20:00</p>
          </div>

          <div className="d-flex justify-content-end">
            <MapCard />
          </div>
        </div>

        <hr />
        <div>
          <p
            className={`${styles["text-p-card"]} mb-2`}
            style={{ fontWeight: 700 }}
          >
            Львів, вул.Івана Виговського 3
          </p>
          <h6
            className={` ${styles["text-h6-bottom"]}`}
            style={{ fontWeight: 500 }}
          >
            Очікуваний час підтвердження броні:<span> о 20:50</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default MyPharmacie;
