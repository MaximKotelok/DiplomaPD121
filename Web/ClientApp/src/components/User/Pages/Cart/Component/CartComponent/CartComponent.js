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
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import CarouselListComponent from "../../../../Common/CarouselListComponent/CarouselListComponent";
import { initFavsProducts, isFavoriteProduct } from "../../../../../../utils/Functions";
import { getRecentlyViewedProductsIds } from "../../../../../../utils/SessionStorage";
import { getProductsFromIdsArray } from "../../../../../../services/product";
import MiniProductCardComponent2 from "../../../../../Common/MiniProductCardComponent2/MiniProductCardComponent2";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import useWindowSize from "../../../Profile/UseWindowSize";

const CartComponent = () => {
  const dispatch = useDispatch();
  const { cart, loader } = useSelector((state) => state.cart);

  const { width } = useWindowSize();
  const isMobile = width <= 1200;


  const [recently, setRecently] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    initFavsProducts(setFavs);
    initRecentlyViewed();
  }, []);

  async function initRecentlyViewed() {
    let ids = getRecentlyViewedProductsIds();
    if (ids.length == 0) return;

    setRecently(await getProductsFromIdsArray(ids));
  }

  function isCustomFavorite(id) {
    return isFavoriteProduct(id);
  }

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
    <div className={`${!isMobile ? "container " : styles["my-container"]}`}>
    {/* <div className={`${!isMobile ? "container " : styles["my-container"]}`}> */}
      <h2 className={` ${styles["head-text"]} `}>Кошик</h2>

      <div>
        {/* Якщо є дані */}
       {cart && cart.length>0 ? cart.map((a) => {
          return <CardCartContainerComponent data={a} />;
        }):
        (<div>
           <div>
          <h4 className={` ${styles["text-pust"]} mb-4 `}>Кошик порожній</h4>

          <AccordionComponent
            id="1"
            title="Ви точно будете впевнені, що заброньовані товари вас чекають в аптеці за вказаною ціною."
            header="Навіщо додавати аптеки в список?"
            buttonLocation="justify-content-center"
          />
          <AccordionComponent
            id="1"
            title="Ви можете вибрати аптеку на сторінці оформлення замовлення, за умови, що товари з вашого замовлення є в наявності в цій аптеці."
            header="Як зробити бронь?"
            buttonLocation="justify-content-center"
          />
        </div>

          {recently && recently.length > 0 &&
        <div style={{ marginBottom: "80px" }}>
          <h4 className={` ${styles["text-pust"]} mt-5 mb-4 `}>
            Нещодавно переглянуті товари
          </h4>
            <CarouselListComponent xlDisplayCount={5} xxlDisplayCount={6}>
              {
                recently.map((a) => (
                  <MiniProductCardComponent

                    key={a.id}
                    id={a.id}
                    title={a.title}
                    description={a.shortDescription}
                    minPrice={a.minPrice}
                    countOfPharmacies={a.count}
                    manufacturer={a.manufacturer}
                    imageUrl={a.pathToPhoto}
                    isFavorite={isCustomFavorite}
                  />

                )
                )

              }
            </CarouselListComponent>
        </div>
    }
      </div>)
  }
  </div>
    </div>
  );
};

export default CartComponent;
