import React, { Component, useEffect, useState } from "react";
import CarouselListComponent from "../../Common/CarouselListComponent/CarouselListComponent";
import { ApiPath, Success } from "../../../../utils/Constants";
import {
  getRecentlyViewedProductsIds,
  getRecomendedRandomCategory,
  setRecomendedRandomCategory,
} from "../../../../utils/SessionStorage";

import VitaminCardComponnent from "../../Common/VitaminCardComponent/VitaminCardComponnent";
import MoreLink from "../../../Common/MoreLinkComponent/MoreLink";
import PopularButtonComponnent from "./Component/PopularButtonComponent/PopularButtonComponnent";
import CircleCard from "../../../Common/CircleCardComponent/CircleCard";
import CustomList from "./Component/CustomListComponent/CustomList";
import AccordionComponnent from "../../../Common/AccordionQuestionComponent/accordionComponent";
import MiniProductCardComponent from "../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import homePageImg from "../../../../assets/images/BANNER.png";
import AdaptiveContainerComponent from "../../../Common/AdaptiveContainerComponent/AdaptiveContainerComponent";

import "./Home.css";
import {
  getFirstNItemRecomendedCategoryByPhoto,
  getFirstNItemMainCategories,
  getFirstNItemsOfRecomendedCategoryById,
} from "../../../../services/category";
import {
  getCountProducts,
  getProductsFromIdsArray,
  getTopOffer,
  getTopOffers,
} from "../../../../services/product";
import { getCountBrands } from "../../../../services/brand";
import { getFavs } from "../../../../services/favProducts";
import { initFavs, isFavorite } from "../../../../utils/Functions";
export const Home = () => {
  var displayName = Home.name;

  const [products, setProducts] = useState({});
  const [recently, setRecently] = useState({});
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});
  const [favs, setFavs] = useState([]);
  const [pngCards, setPngCards] = useState({});
  
  const [topOffers, setTopOffers] = useState({});
  const [selectedTopOfferIndex, setSelectedTopOfferIndex] = useState(null);

  async function initPngCards() {
    let id = getRecomendedRandomCategory("PNG");
    const count = 5;
    if (id) {
      let pngCards = await getFirstNItemsOfRecomendedCategoryById(id, count);
      setPngCards(pngCards.data.result);
    } else {
      let pngCards = await getFirstNItemRecomendedCategoryByPhoto("PNG", count);

      setRecomendedRandomCategory("PNG", pngCards.data.id);
      setPngCards(pngCards.data.result);
    }
  }

  async function initProducts() {
    setProducts(await getCountProducts(8));
  }

  async function initCategories() {
    setCategories(await getFirstNItemMainCategories(9));
  }

  async function initTopOffers() {
    let tmp = await getTopOffer();
    console.log(tmp)
    if(tmp.status === Success && tmp.data.length > 0) {
      setTopOffers(tmp.data);
      setSelectedTopOfferIndex(0);
    }
  }

  async function initBrands() {
    setBrands(await getCountBrands(7));
  }
  async function initRecentlyViewed() {
    
    let ids = getRecentlyViewedProductsIds();
    if (ids.length == 0) return;

    setRecently(await getProductsFromIdsArray(ids));
  }

  useEffect(() => {
    initFavs(setFavs);
    initProducts();
    initRecentlyViewed();
    initCategories();
    initBrands();
    initPngCards();    
    initTopOffers();    
  }, []);

  function isCustomFavorite(id) {
    return isFavorite(id, favs);
  }
  // Макс поправ карточки і каруселі!!!!!!!!!!!!!!!!!!!!!!-!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <>
      <div className="row">
        <img src={homePageImg} />

        <div className="row">
          <div className="col-4">
            <CustomList data={categories.data} />
            {/* <MoreLink link="." /> */}
          </div>

          <div className="col-8">
            <div className="row mt-5" style={{ margin: 0, padding: 0 }}>
              <div>
                <CarouselListComponent title="Пропозиції">
                  {products && products.map
                    ? products.map((a) => (
                        <MiniProductCardComponent
                          key={a.id}
                          id={a.id}
                          isFavorite={isCustomFavorite}
                          title={a.title}
                          description={a.shortDescription}
                          minPrice={a.minPrice}
                          countOfPharmacies={a.count}
                          manufacturer={a.manufacturer}
                          imageUrl={a.pathToPhoto}
                        />
                      ))
                    : new Array(15)
                        .fill(null)
                        .map((_, index) => (
                          <MiniProductCardComponent key={index} />
                        ))}
                </CarouselListComponent>
              </div>
            </div>
            <div className="row mt-5" style={{ margin: 0, padding: 0 }}>
              {recently && recently.map && (
                <div>
                  <CarouselListComponent title="Нещодавно переглянуті товари">
                    {recently.map((a) => (
                      <MiniProductCardComponent
                        key={a.id}
                        isFavorite={isCustomFavorite}
                        id={a.id}
                        title={a.title}
                        description={a.shortDescription}
                        minPrice={a.minPrice}
                        countOfPharmacies={a.count}
                        manufacturer={a.manufacturer}
                        imageUrl={a.pathToPhoto}
                      />
                    ))}
                  </CarouselListComponent>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="text-title ">Бренд</h3>
          </div>
          <div className="flex-container d-flex flex-wrap">
            {brands.data && brands.data.map
              ? brands.data.map((a) => {
                  return (
                    <CircleCard
                      key={a.id}
                      text={a.name}
                      imageUrl={`${ApiPath}${a.pathToPhoto}`}
                    />
                  );
                })
              : new Array(7).fill(null).map((_, index) => {
                  return <CircleCard key={index} text="Name" />;
                })}
          </div>
        </div>
        {topOffers && topOffers.map && 
        (<div className="col-12 mt-5">
          <div className="d-flex justify-content-between">
            <h3 className="text-title mb-4">Популярні товари</h3>
            <MoreLink link="." />
          </div>
         
          
          <div className="d-flex justify-content-start">
            {
              topOffers.map((a,index)=><PopularButtonComponnent text={a.title} key={index} onClick={()=>setSelectedTopOfferIndex(index)}/>)
            }
            
          </div>
          <CarouselListComponent xlDisplayCount={6}>
            {topOffers[selectedTopOfferIndex].data.map((a,index)=>(<MiniProductCardComponent
                key={index}
                isFavorite={isCustomFavorite}
                id={a.id}
                title={a.title}
                description={a.shortDescription}
                minPrice={a.minPrice}
                countOfPharmacies={a.count}
                manufacturer={a.manufacturer}
                imageUrl={a.pathToPhoto}

                />))}
          </CarouselListComponent>
        </div>)
      }
        <div className="col-12 baner-bottom mt-5"></div>
      </div>
      

      {pngCards && pngCards.map && (
        <div className="col-12 mt-5">
          <div className=" d-flex justify-content-between">
            <h3 className="text-title mb-4">Вітаміни та мінерали</h3>
            <MoreLink link="." />
          </div>

          <AdaptiveContainerComponent>
            {pngCards.map((a) => {
              return (
                <VitaminCardComponnent
                  key={a.id}
                  imageUrl={`${ApiPath}${a.pathToPhoto}`}
                  text={a.title}
                  color="#E0E0E0"
                />
              );
            })}
          </AdaptiveContainerComponent>
        </div>
      )}

      <div className="row mt-5 mb-4" style={{ margin: 0, padding: 0 }}>
        <div className="col-12 col-md-6">
          <AccordionComponnent
            id="1"
            title="Ви можете вибрати аптеку на сторінці оформлення замовлення, за умови, що товари з вашого замовлення є в наявності в цій аптеці."
            header="Як мені вибрати конкретну аптеку?"
          />
          <AccordionComponnent
            id="2"
            title="......"
            header="Як мені оформити замовлення із самовивозом з аптеки?"
          />
          <AccordionComponnent
            id="3"
            title="......"
            header="Я можу зробити замовлення з самовивозом з аптеки і оплатити його карткою на сайті?"
          />
          <AccordionComponnent
            id="4"
            title="......"
            header="Яка вартість доставки?"
          />
        </div>

        <div className="col-12 col-md-6">7</div>
      </div>
    </>
  );
};
