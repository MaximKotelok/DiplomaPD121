import React, { useEffect, useContext,useState } from "react";
import styles from "./Cart.module.css";
import CardCartContainerComponennt from "./Component/CardCartContainerComponennt/CardCartContainerComponennt";
import { getCart } from "../../../../services/cartService";
import { getPharmacyProduct, getPharmacy } from "../../../../services/pharmacy";
import { StateInfos, Success } from "../../../../utils/Constants";

const Cart = () => {
  const [loader, setLoader] = useState(StateInfos.LOADING);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    init();
  },[])

  async function init(){
    let tmpCart = getCart();

    tmpCart = await Promise.all(await tmpCart.map(async a=>{
      let res = await getPharmacy(a.id);
      
      if(res.status !== Success) 
        return {};

      res = res.data;
      let items = await Promise.all(a.items.map(async b=>{        
        let res = await getPharmacyProduct(a.id, b.id)
        if(res.status !== Success){
          return {};
        }
        res = res.data;
        let item = {
          title: res.product.title, 
          shortDescription: res.product.shortDescription, 
          pathToPhoto: res.product.pathToPhoto, 
          quantity: b.count,
          id: res.id,
          price: res.price
        }        
        return item;
      }))

      items = items.filter(a=>a!={});  

      return {title: res.pharmaCompany.title,address: res.address ,items: items}
    }))

    tmpCart = tmpCart.filter(a=>a!={});

    setCart(tmpCart)
    setLoader(StateInfos.LOADED)
  }

  if(loader === StateInfos.LOADING) 
    return "Loading...";

  return (
    // <div className={`${styles["my-10"]} container text-center d-flex flex-column align-items-center`}>

    // </div>
    <div>
      <h3 className="mb-4">Кошик</h3>
      <div className="container">
        {cart.map(a=>{
          return <CardCartContainerComponennt data={a} />
        })}        
        
      </div>
    </div>
  );
};

export default Cart;
