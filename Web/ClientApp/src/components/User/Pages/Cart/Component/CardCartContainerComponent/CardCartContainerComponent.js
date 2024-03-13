import React, { useEffect, useContext } from "react";
import CartBYComponent from "../CartBYComponent/CartBYComponent";
import styles from "./CardCartContainer.module.css";
import btnOcloko from "../../../../../../assets/images/znakOkloko.svg";
import { Link } from "react-router-dom";
import { isPharmacyOpen } from "../../../../../../utils/Functions";

const CardCartContainerComponent = ({data}) => {
  let isOpen = isPharmacyOpen(data.timeOpen,data.timeClosed);
  return (
    <div className={`mb-4 ${styles["body-card-cart"]}`}>
      <div className="row">
        <div className="col-md-12">
          <h1 className={`${styles["h-container"]}`}>
            {data.title}{" "}
            <img
              style={{ height: "24px", cursor: "pointer" }}
              src={btnOcloko}
              alt="Картинка"
            />{" "}
          </h1>
          <p className={` ${styles["p-container"]}`}>        
            {isOpen?`Відкрито до ${data.timeClosed}`:`Буде відкрито з ${data.timeOpen}`}                
          </p>
          <p className={` ${styles["p-container"]}`}>
            {data.address}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">                    
          <hr className="my-4" />
          {data.items.map(a=>(
          <div>
            <CartBYComponent data={a}/>
            <hr className="my-4" />
          </div>          
          ))}
        </div>

        <div className="col-md-12">
          <div className="card" style={{ border: "none" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h3 className={`${styles["t-razom"]}`}>Разом:</h3>
                <h2 class={`text-right ${styles["t-all-price"]}`}>
                  {data.items.map(a=>a.price*a.quantity).reduce((a,b)=>a+b,0).toFixed(2)}<span className={`ms-2 ${styles["t-grn"]}`}>грн</span>
                </h2>
              </div>
              <div className="row mt-4">
                <div className="col-6 ps-2 pe-2">
                  <a
                    className={`btn brn-form ${styles["card-btn-primary-500"]}  w-100 `}
                    href={`/map/pharmacies/${data.id}`}
                  >
                    Продовжити підбір в цій аптеці
                  </a>
                </div>
                <div className="col-6 ps-2 pe-2">
                  <Link to={`/ReservationConfirm/${data.id}`}
                    className={`brn-form ${styles["card-btn-primary"]} btn  w-100 `}
                  >
                    Оформити бронювання
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartContainerComponent;
