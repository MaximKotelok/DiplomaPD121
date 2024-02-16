import React, { useEffect, useContext, useState } from "react";
import photo from "./tabletka.png";
import { ReactComponent as BtnPlusCount } from "./plusBtnCount.svg";
import { ReactComponent as BtnMinusCount } from "./minusBtnCount.svg";
// import { ReactComponent as btnClose } from "../../../../../../assets/images/btnClose.svg";
import btnClose from "../../../../../../assets/images/btnClose.svg";
import styles from "./CartBY.module.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { toTwoDigitsNumber } from "../../../../../../utils/Functions";
import { ApiPath } from "../../../../../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { reloadCart } from "../../../../../../reducers/reducers";
import { changeCountInCart } from "../../../../../../services/cartService";

const CartBYComponent = ({data}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);


  const updateCart = (pharmacyId, itemId, count) => {
    if (changeCountInCart(pharmacyId, itemId, count)) {
      const updatedCart = cart.map((pharmacy) => {
        if (pharmacy.id !== pharmacyId) {
          return pharmacy;
        }
  
        const updatedItems = pharmacy.items.map((item) => {
          if (item.id !== itemId) {
            return item;
          }
  
          if (count !== 0) {            
            return { ...item, quantity: count };
          } else {
            
            return null;
          }
        }).filter(Boolean); 
  
        return { ...pharmacy, items: updatedItems };
      }).filter((pharmacy) => pharmacy.items.length > 0);
  
      dispatch(reloadCart(updatedCart));
    }
  };
  


  if(!data)
  return (<></>)

  return (
    
    <div>
      <div className="row">
        <div className="col-1">
          <img style={{ height: "100px" }} src={`${ApiPath}${data.pathToPhoto}`} alt="Картинка" />
        </div>
        <div className="col-9  d-flex flex-column  align-items-start  justify-content-between">
          <p className={`${styles["header-text-cart-product"]}`}>{data.title}</p>
          <h6>{data.shortDescription}</h6>
          {/* <p>Упаковка 1</p> */}
        </div>
        <div className="col-2 d-flex flex-column align-items-end justify-content-between  ">
          <img
            style={{ height: "24px", cursor: "pointer" }}
            src={btnClose}
            onClick={()=> updateCart(data.pharmacyId, data.id, 0)}
            alt="Картинка"
          />
          <p className={`${styles["text-price-product"]}`}>
            {data.price.toFixed(2)}<span className={`ms-2 ${styles["t-grn"]}`}>грн</span>
          </p>
          <div className="float-left">
            <ButtonGroup>
              <button
                className={`${styles["btn-group-cout"]} ${styles["btn-left"]}`}
                onClick={()=> updateCart(data.pharmacyId, data.id, data.quantity-1)}
              >
                <BtnMinusCount />
              </button>
              <button
                className={`${styles["input-group-cout"]}`}
                style={{ minWidth: "40px" }}
              >
                {data.quantity}
              </button>
              <button
                className={`${styles["btn-group-cout"]} ${styles["btn-right"]}`}
                onClick={()=> updateCart(data.pharmacyId, data.id, data.quantity+1)}
              >
                <BtnPlusCount />
              </button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBYComponent;
