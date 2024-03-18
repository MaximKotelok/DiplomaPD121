import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCategoryById, GetCategoryProductsForFilter } from "../../../../../../services/category";
import { StateInfos, Success } from "../../../../../../utils/Constants";
import { initFavs, isFavorite } from "../../../../../../utils/Functions";

import styles from "./CategoryWithSubCategoriesComponent.module.css"
import ProductFilterComponent from "../../../../../Common/ProductFilterComponent/ProductFilterComponent";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
export const CategoryWithProductsComponent = () => {

  const categoriesPerPage = 4;

  const { id, currentPageParam } = useParams();
  const [category, setCategory] = useState(null);
  const [favs, setFavs] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxOfCategories, setMaxOfCategories] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  useEffect(() => {
    init();
    initFavs(setFavs);
  }, [id]);


  async function init() {
    let category = await GetCategoryById(id);
    if (currentPageParam)
      setCurrentPage(currentPageParam)
    if (category.status == Success) {

      setCategory(category.data);
      setMaxOfCategories(category.data.count);
      setLoader(StateInfos.LOADED)
      
      let res = (await GetCategoryProductsForFilter(id, 0, 999)).data
      setProducts(res)
      setFilteredProducts(res)
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



  if (loader == StateInfos.LOADING) {
    return <>Loading</>
  }
  else if (loader == StateInfos.ERROR) {
    return <>Error</>
  }

  return (
    <>

      <p className={`${styles["category-header"]}`}>{category.title}</p>
      <hr />
      <div className="row">
        <div className="col-3">
          {
            <ProductFilterComponent products={products} setProducts={setFilteredProducts} />
          }
        </div>
        <div className="col-9 d-flex">
          {filteredProducts && filteredProducts.map
            ? filteredProducts.map((a) => (
              <MiniProductCardComponent
                key={a.id}
                id={a.id}
                isFavorite={isFavorite}
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


        </div>
      </div>
    </>

  )

};
