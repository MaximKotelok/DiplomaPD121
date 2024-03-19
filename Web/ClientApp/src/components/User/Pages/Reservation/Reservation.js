import React, { Component, useEffect, useState } from "react";
// import { checkIsAuth } from "../../../../services/user";
// import { useParams } from "react-router-dom";

// import { changeCountInCart, getCart } from "../../../../services/cartService";

import styles from "./Reservation.module.css";
import btnOcloko from "../../../../assets/images/znakOkloko.svg";
import ProductComponent from "./ProductComponent/ProductComponent";

// import { ApiPath, StateInfos, Success } from "../../../../utils/Constants";
// import { getPharmacy, getPharmacyProduct } from "../../../../services/pharmacy";
// import { toast } from "react-toastify";
// import { redirect404 } from "../../../../utils/Functions";
// import {
//   postLoggedReserve,
//   postReservation,
// } from "../../../../services/reservation";

export const Reservation = () => {
  // const { pharmacyId } = useParams();
  // const [productFormData, setProductFormData] = useState({});
  // const [userFormData, setUserFormData] = useState({ phone: "", email: "" });
  // const [isAuth, setIsAuth] = useState(null);

  // const [loader, setLoader] = useState(StateInfos.LOADING);

  // useEffect(() => {
  //   init();
  // }, []);

  // async function init() {
  //   setIsAuth(await checkIsAuth());

  //   const cart = getCart();
  //   const index = cart.findIndex(a => a.id == pharmacyId);
  //   if (index === -1) {
  //     redirect404();
  //   }

  //   let pharmacyData = await getPharmacy(cart[index].id);
  //   if (pharmacyData.status === Success) {
  //     pharmacyData = pharmacyData.data;
  //     let res = await Promise.all(
  //       await cart[index].items.map(async a => {

  //         let res = await getPharmacyProduct(cart[index].id, a.id);
  //         if (res.status === Success) {
  //           res = res.data;
  //           let quantity = a.count;
  //           if (quantity > res.quantity) {
  //             quantity = res.quantity;
  //             changeCountInCart(cart[index].id, a.id, quantity);
  //             toast.error(`Нажаль на складі є лише ${res.quantity} од. ${res.product.title}`);
  //           }
  //           return { id: res.id, title: res.product.title, pathToPhoto: res.product.pathToPhoto, price: res.price, quantity: quantity };
  //         }
  //         return null;
  //       })
  //     );
  //     res = res.filter(a => a);
  //     setProductFormData({
  //       pharmaId: pharmacyData.id,
  //       pharmacyName: pharmacyData.pharmaCompany.title,
  //       pharmacyAddress: pharmacyData.address,
  //       items: res
  //     });

  //     setLoader(StateInfos.LOADED);
  //   }else{
  //     redirect404();
  //   }

  // }

  // function userFormDataUpdate(e){
  //   setUserFormData({...userFormData, [e.target.name]:e.target.value});
  // }

  // function submit(){
  //   const cart = getCart();
  //   const index = cart.findIndex(a => a.id == pharmacyId);
  //   if(isAuth){
  //     postLoggedReserve(

  //         productFormData.items.map(a=>{return a.id}),cart[index].id

  //     );
  //   }else{
  //     if(userFormData.phone && userFormData.email){
  //       postReservation(
  //           productFormData.items.map(a=>{return a.id}),
  //         userFormData.phone,
  //         userFormData.email,
  //         cart[index].id
  //       );
  //     }
  //   }
  // }

  // if(loader == StateInfos.LOADING)
  //   return "Loading...";

  return (
    // <>
    //   {
    //     !isAuth && (
    //       <div>
    //         <input name="phone" placeholder="+38" onChange={userFormDataUpdate} value={userFormData.phone}/>
    //         <input name="email" onChange={userFormDataUpdate} value={userFormData.email}/>
    //       </div>
    //     )
    //   }

    //   <div>
    //     <h5>{productFormData.pharmacyName}</h5>
    //     <h6>{productFormData.pharmacyAddress}</h6>
    //     {productFormData.items.map(a=>{
    //       return <>
    //         <img src={`${ApiPath}${a.pathToPhoto}`} width={100}/>
    //         <p>{a.title}</p>
    //         <p>{a.quantity} одиниць</p>
    //       </>
    //     })}

    //     <button onClick={submit}>Submit</button>

    //   </div>
    // </>

    <div className={`row ${styles["global-text"]}`}>
      <h2 className={` ${styles["head-text"]}`}>Бронювання</h2>
      <div className={`col-md-8`}>
        <div className={`${styles["div-form"]} ${styles["div-block"]}`}>
          <div className={`mb-4`}>
            <h4 className={`${styles["head-text-form"]}`}>Телефон</h4>
            <input
              className={`${styles["placholder-style"]} input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="phoneNumber"
              type="phoneNumber"
              name="phoneNumber"
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
              placeholder="Email"
              type="Email"
              name="Email"
              required
            />
          </div>
        </div>
        <div
          className={` ${styles["div-info-pharmacy"]} ${styles["div-block"]}  `}
        >
          <h3 className={`head-text-info`}>
            Аптека подорожник{" "}
            <img
              style={{ height: "24px", cursor: "pointer" }}
              src={btnOcloko}
              alt="Картинка"
            />
          </h3>
          <p className={`mt-4 mb-2 ${styles["p-text-info"]}`}>
            Відкрито до 23:00
          </p>
          <p className={`${styles["p-text-info"]}`}>
            вул. Гетьмана Мазепи 12, Львів
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
              <br />о <span c>14:15</span>
            </span>
          </p>
        </div>
      </div>

      <div className={`col-md-4`}>
        <div className={` ${styles["div-block"]} ${styles["div-pidsum"]}`}>
          <h3 className={`${styles["text-pidsum"]} mb-5`}>Підсумок</h3>
          <div>
            <ProductComponent />
            <ProductComponent />
            <ProductComponent />
          </div>
          <div className={`d-flex mb-2   justify-content-between`}>
            <h6 className={`text-zag-sum`}>Загальна сума: </h6>
            <h5 className={`number-text`}>
              3444.20 <span>грн</span>{" "}
            </h5>
          </div>
          <button className="brn-form brn-primary-form mb-3 " type="submit">
            Забронювати
          </button>
        </div>
      </div>
    </div>
  );
};
