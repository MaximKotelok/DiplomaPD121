import React, { useEffect, useContext,useState } from "react";
import { Provider } from "react-redux";
import store from "../../../../reducers/stores/store";
import CartComponent from "./Component/CartComponent/CartComponent";


const Cart = () => {

  
  return (
    // <div className={`${styles["my-10"]} container text-center d-flex flex-column align-items-center`}>

    // </div>    
    <Provider store={store}>
    <CartComponent/>
    </Provider>
  );
};

export default Cart;
