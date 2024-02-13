import React, { useEffect, useContext, useState } from "react";
import photo from "./tabletka.png";
import { ReactComponent as BtnPlusCount } from "./plusBtnCount.svg";
import { ReactComponent as BtnMinusCount } from "./minusBtnCount.svg";
// import { ReactComponent as btnClose } from "../../../../../../assets/images/btnClose.svg";
import btnClose from "../../../../../../assets/images/btnClose.svg";
import styles from "./CartBY.module.css";
import { Button, ButtonGroup } from "react-bootstrap";

const CartBYComponent = () => {
  const [count, setCount] = useState(0);

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
          <img style={{ height: "100px" }} src={photo} alt="Картинка" />
        </div>
        <div className="col-9  d-flex flex-column  align-items-start  justify-content-between">
          <p className={`${styles["header-text-cart-product"]}`}>Текст 1</p>
          <h6>Текст 2 </h6>
          <p>Упаковка 1</p>
        </div>
        <div className="col-2 d-flex flex-column align-items-end justify-content-between  ">
          <img
            style={{ height: "24px", cursor: "pointer" }}
            src={btnClose}
            alt="Картинка"
          />
          <p className={`${styles["text-price-product"]}`}>
            194.23<span className={`ms-2 ${styles["t-grn"]}`}>грн</span>
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
