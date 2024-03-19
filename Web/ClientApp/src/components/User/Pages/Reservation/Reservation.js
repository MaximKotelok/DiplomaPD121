import React, { Component, useEffect, useState } from "react";
import { checkIsAuth } from "../../../../services/user";
import { useParams } from "react-router-dom";

import { changeCountInCart, getCart } from "../../../../services/cartService";

import styles from "./Reservation.module.css";
import btnOcloko from "../../../../assets/images/znakOkloko.svg";
import ProductComponent from "./ProductComponent/ProductComponent";

import { ApiPath, StateInfos, Success } from "../../../../utils/Constants";
import { getPharmacyById, getPharmacyProduct } from "../../../../services/pharmacy";
import { toast } from "react-toastify";
import { addMinutes, getCurrentTimeInUkraine, isPharmacyOpen, redirect404 } from "../../../../utils/Functions";
import {
  postLoggedReserve,
  postReservation,
} from "../../../../services/reservation";

export const Reservation = () => {
  const { pharmacyId } = useParams();
  const [productFormData, setProductFormData] = useState({});
  const [userFormData, setUserFormData] = useState({ phone: "", email: "" });
  const [isAuth, setIsAuth] = useState(null);

  const [loader, setLoader] = useState(StateInfos.LOADING);



  useEffect(() => {
    init();
  }, []);

  async function init() {
    setIsAuth(checkIsAuth());



    const cart = getCart();
    const index = cart.findIndex(a => a.id == pharmacyId);
    if (index === -1) {
      redirect404();
    }

    let pharmacyData = await getPharmacyById(cart[index].id);
    if (pharmacyData.status === Success) {
      pharmacyData = pharmacyData.data;
      let res = await Promise.all(
        await cart[index].items.map(async a => {

          let res = await getPharmacyProduct(cart[index].id, a.id);
          if (res.status === Success) {
            res = res.data;
            let quantity = a.count;
            if (quantity > res.quantity) {
              quantity = res.quantity;
              changeCountInCart(cart[index].id, a.id, quantity);
              toast.error(`Нажаль на складі є лише ${res.quantity} од. ${res.product.title}`);
            }
            return { id: res.id, title: res.product.title, shortDescription: res.product.shortDescription, pathToPhoto: res.product.pathToPhoto, price: res.price, quantity: quantity };
          }
          return null;
        })
      );
      res = res.filter(a => a);
      setProductFormData({
        pharmaId: pharmacyData.id,
        pharmacyName: pharmacyData.pharmaCompany.title,
        pharmacyAddress: pharmacyData.address,
        isOpen: isPharmacyOpen(pharmacyData.openTime, pharmacyData.closeTime),
        openTime: pharmacyData.openTime,
        closeTime: pharmacyData.closeTime,
        items: res
      });

      setLoader(StateInfos.LOADED);
    } else {
      redirect404();
    }

  }

  function userFormDataUpdate(e) {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });  
  }

  async function submit() {
    const cart = getCart();
    const index = cart.findIndex(a => a.id == pharmacyId);
    let res;
    if (isAuth) {
      res = await postLoggedReserve(
        productFormData.items.map(a => { return { concreteProductId: a.id, quantity: a.quantity } }), 
        cart[index].id
      );
    } else {
      if (userFormData.phone && userFormData.email) {
        res = await postReservation(
          productFormData.items.map(a => { return { concreteProductId: a.id, quantity: a.quantity } }),
          userFormData.phone,
          userFormData.email,
          cart[index].id
        );
      }
    }
    if (res) {
      toast.success("Успіх")
    } else {
      toast.error("Помилка")
    }
  }


  if (loader == StateInfos.LOADING)
    return "Loading...";
  return (
    <div className={`row ${styles["global-text"]}`}>
      <h2 className={` ${styles["head-text"]}`}>Бронювання</h2>
      <div className={`col-md-8`}>
        {!isAuth && (
          <div className={`${styles["div-form"]} ${styles["div-block"]}`}>
            <div className={`mb-4`}>
              <h4 className={`${styles["head-text-form"]}`}>Телефон</h4>
              <input
                className={`${styles["placholder-style"]} input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Ваш номер телефону"

                name="phone"
                onChange={userFormDataUpdate}
                required
              />
              <p className={`${styles["p-text-form"]}`}>
                На цей номер прийде повідомлення з підтвердженням броні.
              </p>
            </div>
            <div className={`pt-2`}>
              <h4 className={`${styles["head-text-form"]}`}>Email</h4>
              <input
                className={`${styles["placholder-style"]} input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Ваш email"
                type="email"
                name="email"
                onChange={userFormDataUpdate}
                required
              />
            </div>
          </div>)}
        <div
          className={` ${styles["div-info-pharmacy"]} ${styles["div-block"]}  `}
        >
          <h3 className={`head-text-info`}>
            {`${productFormData.pharmacyName} `}
            <img
              style={{ height: "24px", cursor: "pointer" }}
              src={btnOcloko}
              alt="Картинка"
            />
          </h3>
          <p className={`mt-4 mb-2 ${styles["p-text-info"]}`}>
            {productFormData.isOpen ? `Відкрито до ${productFormData.closeTime}` : `Буде відкрито з ${productFormData.openTime}`}
          </p>
          <p className={`${styles["p-text-info"]}`}>
            {productFormData.pharmacyAddress}
          </p>
        </div>
        <div
          className={`${styles["div-text-instruction"]} ${styles["div-block"]}`}
        >
          <p className={`mb-2 ${styles["p-instruction"]}`}>
            <span>Отримання: </span>
            самовивіз з аптеки
          </p>
          <p className={`mb-2 ${styles["p-instruction"]}`}>
            <span>Оплата:</span> в аптеці карткою або готівкою
          </p>
          <p className={`mb-2 ${styles["p-instruction"]}`}>
            <span>Термін броні:</span> протягом 48 годин
          </p>
          <p className={`mt-4 ${styles["p-instruction"]}`}>
            Дочекайтеся Viber або SMS-повідомлення з кодом броні, що є
            підтвердженням броні аптекою:
            <span>
              <br />до <span c>{productFormData.isOpen ?
                addMinutes(getCurrentTimeInUkraine(), 15) :
                addMinutes(productFormData.openTime, 15)
              }</span>
            </span>
          </p>
        </div>
      </div>

      <div className={`col-md-4`}>
        <div className={` ${styles["div-block"]} ${styles["div-pidsum"]}`}>
          <h3 className={`${styles["text-pidsum"]} mb-5`}>Підсумок</h3>
          <div>
            {productFormData.items.map(a => {
              return <ProductComponent
                key={a.id}
                title={a.title}
                shortDescription={a.shortDescription}
                quantity={a.quantity}
                image={`${ApiPath}${a.pathToPhoto}`}
                price={a.price}
              />

            })}
          </div>
          <div className={`d-flex mb-2   justify-content-between`}>
            <h6 className={`text-zag-sum`}>Загальна сума: </h6>
            <h5 className={`number-text`}>
              {productFormData.items.map(a => a.price * a.quantity).reduce((a, b) => a + b, 0).toFixed(2)} <span>грн</span>{" "}
            </h5>
          </div>
          <button className="brn-form brn-primary-form mb-3 " onClick={submit}>
            Забронювати
          </button>
        </div>
      </div>
    </div>
  );
};
