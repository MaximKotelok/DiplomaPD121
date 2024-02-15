import React, { useEffect, useContext } from "react";
import styles from "./Cart.module.css";
import CardCartContainerComponennt from "./Component/CardCartContainerComponennt/CardCartContainerComponennt";

const Cart = () => {
  return (
    // <div className={`${styles["my-10"]} container text-center d-flex flex-column align-items-center`}>

    // </div>
    <div>
      <h3 className="mb-4">Кошик</h3>
      <div className="container">
        <CardCartContainerComponennt />
        <CardCartContainerComponennt />
      </div>
    </div>
  );
};

export default Cart;
