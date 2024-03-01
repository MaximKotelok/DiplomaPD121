import React, { Component, useEffect, useState } from "react";
import { checkIsAuth } from "../../../../services/user";
import { useParams } from "react-router-dom";

import { changeCountInCart, getCart } from "../../../../services/cartService";

import styles from "./Reservation.module.css";
import { ApiPath, StateInfos, Success } from "../../../../utils/Constants";
import { getPharmacy, getPharmacyProduct } from "../../../../services/pharmacy";
import { toast } from "react-toastify";
import { redirect404 } from "../../../../utils/Functions";
import { postLoggedReserve, postReservation } from "../../../../services/reservation";

export const Reservation = () => {

  const { pharmacyId } = useParams();
  const [ productFormData, setProductFormData ] = useState({});
  const [ userFormData,setUserFormData ] = useState({ phone: "", email: "" });
  const [isAuth,setIsAuth] = useState(null);

  const [loader, setLoader] = useState(StateInfos.LOADING);


  useEffect(() => {
    init();
  }, []);

  async function init() {
    setIsAuth(await checkIsAuth());

    const cart = getCart();
    const index = cart.findIndex(a => a.id == pharmacyId);
    if (index === -1) {
      redirect404();
    }

    let pharmacyData = await getPharmacy(cart[index].id);
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
            return { id: res.id, title: res.product.title, pathToPhoto: res.product.pathToPhoto, price: res.price, quantity: quantity };
          }
          return null;
        })
      );
      res = res.filter(a => a);
      setProductFormData({
        pharmaId: pharmacyData.id,
        pharmacyName: pharmacyData.pharmaCompany.title,
        pharmacyAddress: pharmacyData.address,
        items: res        
      });

      setLoader(StateInfos.LOADED);
    }else{
      redirect404();
    }
    
  }
  
  function userFormDataUpdate(e){
    setUserFormData({...userFormData, [e.target.name]:e.target.value});
  }

  function submit(){
    const cart = getCart();
    const index = cart.findIndex(a => a.id == pharmacyId);
    if(isAuth){
      postLoggedReserve(
        
        productFormData.items.map(a=>{return {concreteProductId: a.id, quantity: a.quantity}}),
        cart[index].id
      );
    }else{
      if(userFormData.phone && userFormData.email){
        postReservation(     
            productFormData.items.map(a=>{return {concreteProductId: a.id, quantity: a.quantity}}),
          userFormData.phone, 
          userFormData.email, 
          cart[index].id
        );
      }
    }
  }



  if(loader == StateInfos.LOADING)
    return "Loading..."; 

  

  return (
    <>
      {
        !isAuth && (
          <div>
            <input name="phone" placeholder="+38" onChange={userFormDataUpdate} value={userFormData.phone}/>
            <input name="email" onChange={userFormDataUpdate} value={userFormData.email}/>
          </div>          
        )
      }
      
      <div>
        <h5>{productFormData.pharmacyName}</h5>
        <h6>{productFormData.pharmacyAddress}</h6>
        {productFormData.items.map(a=>{
          return <>
            <img src={`${ApiPath}${a.pathToPhoto}`} width={100}/>
            <p>{a.title}</p>
            <p>{a.quantity} одиниць</p>
          </>
        })}

        <button onClick={submit}>Submit</button>
      </div>
    </>
  );
};
