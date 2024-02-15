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

const CartBYComponent = ({data}) => {
  console.log(data)
  const [count, setCount] = useState(data.quantity);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleInputChange = (e) => {
    const input = parseInt(e.target.value, 10);
    if (!isNaN(input)) {
      setCount(input);
    }
  };

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
            alt="Картинка"
          />
          <p className={`${styles["text-price-product"]}`}>
            {toTwoDigitsNumber(data.price)}<span className={`ms-2 ${styles["t-grn"]}`}>грн</span>
          </p>
          <div className="float-left">
            <ButtonGroup>
              <button
                className={`${styles["btn-group-cout"]} ${styles["btn-left"]}`}
                onClick={handleDecrement}
              >
                <BtnMinusCount />
              </button>
              <button
                className={`${styles["input-group-cout"]}`}
                style={{ minWidth: "40px" }}
              >
                {count}
              </button>
              <button
                className={`${styles["btn-group-cout"]} ${styles["btn-right"]}`}
                onClick={handleIncrement}
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
