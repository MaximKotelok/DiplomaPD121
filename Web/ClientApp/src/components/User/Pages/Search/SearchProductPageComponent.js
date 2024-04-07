import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetCategoryById,
  GetCategoryProductsForFilter,
} from "../../../../services/category";
import { GetBrandById, StateInfos, Success } from "../../../../utils/Constants";
import { initFavsProducts, isFavoriteProduct } from "../../../../utils/Functions";

import ProductFilterComponent from "../../../Common/ProductFilterComponent/ProductFilterComponent";
import MiniProductCardComponent from "../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import { ReactComponent as CardBtn } from "../../../../assets/images/category/Card.svg";
import { ReactComponent as TableBtn } from "../../../../assets/images/category/Table.svg";
import banner  from "../../../../assets/images/search/banner.svg";
import MiniCardProductANDTableProductComponent from "../../../Common/MiniCardProductANDTableProductComponent/MiniCardProductANDTableProductComponent";

import styles from "./SearchProductPageComponent.module.css";
import { Search } from "../../../../services/product";
import { getBrandById } from "../../../../services/brand";
import { getActiveSubstance } from "../../../../services/activeSubstance";
import PaginationComponent from "../../../Common/PaginationComponent/PaginationComponent";

export const SearchProductPageComponent = () => {
  const [filters, setFilters] = useState({});
  const [searchByTitle, setSearchByTitle] = useState("");
  const [page, setPage] = useState(1);
  const [countOfPages, setCountOfPages] = useState(1);

  async function search(page = 1){
    let clone = {...filters};    
    let categories = clone.categories?Object.keys(clone.categories).map(a=>parseInt(clone.categories[a].value)):[];
    let brands = clone.brands?Object.keys(clone.brands).map(a=>parseInt(clone.brands[a].value)):[];
    delete clone.categories;
    
    delete clone.brands;        

    function convertToServerModel(key, array) {
      const outputArray = [];

      for (let item in array) {
          outputArray.push({ name: key, value: array[item].value });
      }

      return outputArray;
  }

    let searchResult = await Search(
        searchByTitle, 
        categories, 
        brands, 
        activeSubstanceId?activeSubstanceId:null, 
        [].concat(...Object.keys(clone)
            .map(a=>convertToServerModel(a,clone[a]))
        ),
        page
    );
    if(searchResult.status === Success)
        return searchResult.data;
    return null;

}



  const { title, categoryId, brandId, extraParamId, extraParamValue, activeSubstanceId } = useParams();  
  const [isGridTalbeActive, setGridTalbeActive] = useState(true);  
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  const [pageName, setPageName] = useState("Пошук");

  const SEPARATED_COUNT = 8;

  const handleGridTableClick = (boolean) => {
    setGridTalbeActive(boolean);
  };

  useEffect(() => {
      init();
  }, [title, categoryId, brandId, extraParamId, extraParamValue,activeSubstanceId]);
 
  async function init() {
    let res = await Search(
      title, 
      categoryId?[categoryId]:null, 
      brandId?[brandId]:null, 
      activeSubstanceId?parseInt(activeSubstanceId):null, 
      extraParamId&&extraParamValue?[{id:extraParamId, name:extraParamValue}]:null,
      );
    if(res.status === Success){
      setProducts(res.data.products);
      setCountOfPages(res.data.countOfPages)
      if(title){
        setPageName("Пошук")        
      }
      else if(categoryId)
      {
        let categoryResult = await GetCategoryById(categoryId);
        if(categoryResult.status === Success){
          setPageName(`Категорія: ${categoryResult.data.title}`)
        }
      }
      else if(brandId)
      {
        let brandResult = await getBrandById(brandId);
        if(brandResult.status === Success){
          setPageName(`Бренд: ${brandResult.data.name}`)
        }
      }else if(activeSubstanceId){
        let activeSubstanceResult = await getActiveSubstance(activeSubstanceId);
        console.log(activeSubstanceResult)
        if(activeSubstanceResult.status === Success){
          setPageName(`Діюча речовина: ${activeSubstanceResult.data.title}`)
        }
      }
      setLoader(StateInfos.LOADED);
      return;
    }
    setLoader(StateInfos.ERROR);
  }

  if (loader == StateInfos.LOADING) {
    return <>Loading</>;
  } else if (loader == StateInfos.ERROR) {
    return <>Error</>;
  }

  return (
    <>
       <p className={`${styles["category-header"]}`}>{pageName}</p> 
      <hr />
      <div className="row">
        <div className="col-4">
          {
            <ProductFilterComponent
              filters={filters}
              setFilters={setFilters}
              setSearchByTitle={setSearchByTitle}
              setCountOfPages={setCountOfPages}
              setPage={setPage}
              searchByTitle={searchByTitle}
              setProducts={setProducts}
              search={search}
            />
          }
        </div>

        <div className="col-8">
          <div className="d-flex">
            <div className={` ${styles["btn-nav-menu-active"]}`}>
              Список товарі
            </div>
            <div className={`me-4 ms-4 ${styles["btn-nav-menu"]}`}>
              Ціни в аптеках
            </div>
            <div className="ms-auto">
              {/* <div className={`${styles["dropdown"]}`}>
                <select name="one" className={`${styles["dropdown-select"]}`}>
                  <option value="">Select…</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div> */}

              {/* <div className={`${styles["custom-select"]}`}> */}

              {/* <select name="one" className={`${styles["dropdownSelect"]}`}>
                  <option className={`${styles["select-option"]}`} value="">
                    Select…
                  </option>
                  <option className={`${styles["select-option"]}`} value="2">
                    Option #2
                  </option>
                  <option className={`${styles["select-option"]}`} value="1">
                    Option #1
                  </option>
                  <option className={`${styles["select-option"]}`} value="3">
                    Option #3
                  </option>
                  <option className={`${styles["select-option"]}`} value="4">
                    Option #3
                    <hr />
                  </option>
                  <option
                    className={` ${styles["select-option"]} ${styles["select-option-last-child"]}`}
                    value="5"
                  >
                    Option #3
                    <hr />
                  </option>
                </select> */}
              {/* </div> */}
              <div className="btn-group">
                <select className="btn btn-danger" aria-label="Action dropdown">
                  <option selected>Action</option>
                  <option>Another action</option>
                  <option>Something else here</option>
                  <option disabled>---</option>
                  <option>Separated link</option>
                </select>
              </div>
            </div>
            <div
              onClick={() => handleGridTableClick(true)}
              className="me-3 ms-4 "
              style={{ height: " max-content" }}
            >
              <CardBtn
                className={`  ${
                  isGridTalbeActive ? styles["active"] : styles["no-active"]
                }`}
              />
            </div>
            <div
              style={{ height: " max-content" }}
              onClick={() => handleGridTableClick(false)}
              т
            >
              <TableBtn
                className={`   ${
                  isGridTalbeActive ? styles["no-active"] : styles["active"]
                }`}
              />
            </div>
          </div>

          <div
            className={` ${styles["products-area-wrapper"]}  ${
              isGridTalbeActive ? styles["gridView"] : styles["tableView"]
            }`}
          >
            {/* <MiniCardProductANDTableProductComponent id="1" /> */}

            {products && products.map
              &&
                products.slice(0, SEPARATED_COUNT).map((a) => (
                  <MiniCardProductANDTableProductComponent
                    key={a.id}
                    id={a.id}
                    isFavorite={isFavoriteProduct}
                    title={a.title}
                    description={a.shortDescription}
                    minPrice={a.minPrice}
                    countOfPharmacies={a.count}
                    manufacturer={a.manufacturer}
                    imageUrl={a.pathToPhoto}
                  />
                ))
          }
          </div>
          <div className="col-12">
            <img src={banner} style={{width: "100%"}}/>
          </div>
        </div>
        {products && products.map && products.length > SEPARATED_COUNT
              && 
                products.slice(SEPARATED_COUNT, products.length).map((a) => (
                  <MiniCardProductANDTableProductComponent
                    key={a.id}
                    id={a.id}
                    isFavorite={isFavoriteProduct}
                    title={a.title}
                    description={a.shortDescription}
                    minPrice={a.minPrice}
                    countOfPharmacies={a.count}
                    manufacturer={a.manufacturer}
                    imageUrl={a.pathToPhoto}
                  />
                ))
              }
      </div>
      <PaginationComponent 
      setContent={setProducts} 
      allowAppend={true} 
      getContent={async (page)=>{
        let res = await search(page);
        if(res)
          return res.products;
        return null;
      }} 
      currentPage={page}
      countOfPages={countOfPages}
      page={page}
      setPage={setPage}
      />
    </>

  );
};
