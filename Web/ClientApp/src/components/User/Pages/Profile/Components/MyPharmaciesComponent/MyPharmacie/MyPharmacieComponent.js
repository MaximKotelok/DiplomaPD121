import React, { useState, useEffect } from "react";
import styles from "./MyPharmacie.module.css";
import { addMinutes, getCurrentTimeInUkraine, isPharmacyOpen } from "../../../../../../../utils/Functions"
import { ReactComponent as BtnDump } from "../../../../../../../assets/images/Dump.svg";
import { ReactComponent as MapCard } from "../../../../../../../assets/images/MapCard.svg";
import { Link } from 'react-router-dom';


const MyPharmacie = (props) => {
    const [isOpen, setIsOpen] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        setIsOpen(isPharmacyOpen(props.pharmacy.openTime, props.pharmacy.closeTime));
    }

    const handlDeleteCardClick = () => {
        props.onRemoveClick(props.pharmacy.id);
    };

  return (
    <div className={`col-12 col-md-6 p-2`}>
      <div className={`${styles["perent-card-pharmacie"]}`}>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className={` ${styles["text-h6-bottom"]}`}>
                {props.pharmacy.pharmaCompany.title}
            </h6>
                <p className={`${styles["text-p-card"]}`}>Зачиниться о {props.pharmacy.closeTime}</p>
          </div>

          <div className="d-flex justify-content-end">
            <span className={`${styles["btn-delet"]}`}>
              <BtnDump onClick={handlDeleteCardClick} />
              </span>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between  align-items-center">
          <div>
            <p className={`${styles["text-p-card"]} mb-2`}>Пн-Пт: {props.pharmacy.workingWeekOpenTime} - {props.pharmacy.workingWeekCloseTime}</p>
            <p className={`${styles["text-p-card"]}`}>Сб-Нд: {props.pharmacy.weekendOpenTime} - {props.pharmacy.weekendCloseTime}</p>
          </div>
           <div className="d-flex justify-content-end">
            <Link to={`/map/pharmacies/${props.pharmacy.id}`}>
                <MapCard  />
            </Link>
          </div>
        </div>

        <hr />
        <div>
          <p
            className={`${styles["text-p-card"]} mb-2`}
            style={{ fontWeight: 700 }}
          >
            {props.pharmacy.address}
          </p>
          <h6
            className={` ${styles["text-h6-bottom"]}`}
            style={{ fontWeight: 500 }}
          >
            Очікуваний час підтвердження броні:<span> о {isOpen ? addMinutes(getCurrentTimeInUkraine(), 15) : addMinutes(props.pharmacy.openTime, 15)}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default MyPharmacie;
