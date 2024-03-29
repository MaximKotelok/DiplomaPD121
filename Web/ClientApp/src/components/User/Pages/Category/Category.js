import React, { Component, useEffect, useState } from "react";

import styles from "./Category.module.css";
import { useParams } from "react-router-dom";
import { GetCategoryById, GetCategoryProductsForFilter, GetProductsFromCategory, GetWithProducts, IsCategoryHasProducts } from "../../../../services/category";
import { StateInfos, Success } from "../../../../utils/Constants";
import { initFavs, isFavorite } from "../../../../utils/Functions";
import CarouselListComponent from "../../Common/CarouselListComponent/CarouselListComponent";
import MiniProductCardComponent from "../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import ProductFilterComponent from "../../../Common/ProductFilterComponent/ProductFilterComponent";
import { CategoryWithSubCategoriesComponent } from "./Component/CategoryWithSubCategoriesComponent/CategoryWithSubCategoriesComponent";
import { CategoryWithProductsComponent } from "./Component/CategoryWithProductsComponent/CategoryWithProductsComponent";
import { SearchProductPageComponent } from "../Search/SearchProductPageComponent";
export const Category = () => {
  const [type, setType] = useState(null);
  const {categoryId} = useParams();
  useEffect(()=>{
    init();
  },[categoryId])
  async function init(){
    setType((await IsCategoryHasProducts(categoryId)).data?"products":"subcategories");
  }


  if(type == null)
    {
      return "";
    }

  return (
    <>
    {
      type == "products"?
      <SearchProductPageComponent />:
      <CategoryWithSubCategoriesComponent/>
    }
    </>
    
  )
  
};
