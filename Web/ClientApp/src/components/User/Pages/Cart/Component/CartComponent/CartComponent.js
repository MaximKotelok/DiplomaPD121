import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../../../../services/cartService";
import { StateInfos, Success } from "../../../../../../utils/Constants";
import {
  getPharmacyById,
  getPharmacyProduct,
} from "../../../../../../services/pharmacy";
import { initCart } from "../../../../../../reducers/reducers";
import CardCartContainerComponent from "../CardCartContainerComponent/CardCartContainerComponent";
import styles from "./Cart.module.css";

const CartComponent = () => {
  const dispatch = useDispatch();
  const { cart, loader } = useSelector((state) => state.cart);
  useEffect(() => {
    init();
  }, [dispatch]);

  async function init() {
    let tmpCart = getCart();

    tmpCart = await Promise.all(
      await tmpCart.map(async (a) => {
        let res = await getPharmacyById(a.id);

        if (res.status !== Success) return {};

        res = res.data;
        let items = await Promise.all(
          a.items.map(async (b) => {
            let res = await getPharmacyProduct(a.id, b.id);
            if (res.status !== Success) {
              return {};
            }
            res = res.data;
            let item = {
              title: res.product.title,
              shortDescription: res.product.shortDescription,
              pathToPhoto: res.product.pathToPhoto,
              quantity: b.count,
              maxQuantity: res.quantity,
              id: res.id,
              price: res.price,
              pharmacyId: a.id,
            };
            return item;
          })
        );

        items = items.filter((a) => a != {});
        return {
          id: res.id,
          title: res.pharmaCompany.title,
          address: res.address,
          timeOpen: res.openTime,
          timeClosed: res.closeTime,
          items: items,
        };
      })
    );

    tmpCart = tmpCart.filter((a) => a != {});

    dispatch(initCart(tmpCart));
  }

  if (loader === StateInfos.LOADING) return "Loading...";

  return (
    // <div className={`${styles["my-10"]} container text-center d-flex flex-column align-items-center`}>

    // </div>
    <div>
      <h2 className={` ${styles["head-text"]} `}>Кошик</h2>
      <div className="container">
        {cart.map((a) => {
          return <CardCartContainerComponent data={a} />;
        })}
      </div>
    </div>
  );
};

export default CartComponent;
