import React, { Component, useEffect, useState } from "react";


import { useParams } from "react-router-dom";
import { GetCategoryById, GetCategoryProductsForFilter, GetProductsFromCategory, GetWithProducts } from "../../../../../../services/category";
import { StateInfos, Success } from "../../../../../../utils/Constants";
import { initFavs, isFavorite } from "../../../../../../utils/Functions";
import CarouselListComponent from "../../../../Common/CarouselListComponent/CarouselListComponent";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import ProductFilterComponent from "../../../../../Common/ProductFilterComponent/ProductFilterComponent";

import styles from "./CategoryWithSubCategoriesComponent.module.css"
export const CategoryWithSubCategoriesComponent = () => {

  const categoriesPerPage = 4;  

  const {id, currentPageParam} = useParams();
  const [category, setCategory] = useState(null);
  const [favs, setFavs] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxOfCategories, setMaxOfCategories] = useState(0);
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  useEffect(() => {
    init();
    initFavs(setFavs);
  }, [id]);

  

  async function init() {
    let category = await GetCategoryById(id);
    if(currentPageParam)
      setCurrentPage(currentPageParam)
    if (category.status == Success) {

      setCategory(category.data);
      setMaxOfCategories(category.data.count);
      loadCategoryProducts()
      setLoader(StateInfos.LOADED)
          
    
      return;
    }
    setLoader(StateInfos.ERROR)
  }

  function calculateRange(pageNumber, itemsPerPage) {
    var n = 0;
 
    var startNumber = (pageNumber - 1) * categoriesPerPage + n;
    var endNumber = pageNumber * itemsPerPage;
 
    return {
        startNumber: startNumber,
        endNumber: endNumber
    };
}

  async function loadCategoryProducts(){   
    let res = calculateRange(currentPage, categoriesPerPage);
    
    let products = await GetWithProducts(id, res.startNumber, res.endNumber, 10);
    
    setCategoriesProducts([...categoriesProducts, ...products.data]);
  }
  

  if (loader == StateInfos.LOADING) {
    return <>Loading</>
  }
  else if (loader == StateInfos.ERROR) {
    return <>Error</>
  }
  
  function isCustomFavorite(id){
    isFavorite(id, favs);
  }

  return (
    <>
      <p className={`${styles["category-header"]}`}>{category.title}</p>
      <hr />
      <div className="row">
        <div className="col-3">
          {
            category.subCategories.map(a=>{
              return (<div className={`${styles["category-link-box"]}`}>
                <a href={`/category/${a.id}`}>
                  {a.title}
                </a>
              </div>)
            })
          }
        </div>
        <div className="col-9">
          {
          categoriesProducts&&
          categoriesProducts.map &&
          categoriesProducts.map(item=>{          
            return <CarouselListComponent title={item.title}>
                  {item.products && item.products.map
                    ? item.products.map((a) => (
                        <MiniProductCardComponent
                          key={a.id}
                          id={a.id}
                          isFavorite = {isCustomFavorite}
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
                </CarouselListComponent>})
          
          }

        </div>
      </div>
    </>
    
  )
  
};
