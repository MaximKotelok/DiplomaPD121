import React, { Component, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetCategoryById,
  GetCategoryProductsForFilter,
} from "../../../../services/category";
import { GetBrandById, StateInfos, Success } from "../../../../utils/Constants";
import {
  initFavsProducts,
  isFavoriteProduct,
} from "../../../../utils/Functions";

import ProductFilterComponent from "../../../Common/ProductFilterComponent/ProductFilterComponent";
import MiniProductCardComponent from "../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import { ReactComponent as CardBtn } from "../../../../assets/images/category/Card.svg";
import { ReactComponent as TableBtn } from "../../../../assets/images/category/Table.svg";
import banner from "../../../../assets/images/search/banner.svg";
import MiniCardProductANDTableProductComponent from "../../../Common/MiniCardProductANDTableProductComponent/MiniCardProductANDTableProductComponent";
// import Select from "react-select";
import styles from "./SearchProductPageComponent.module.css";
import baner from "./ban.svg";
import { Search } from "../../../../services/product";
import { getBrandById } from "../../../../services/brand";
import { getActiveSubstance } from "../../../../services/activeSubstance";
import PaginationComponent from "../../../Common/PaginationComponent/PaginationComponent";
import CustomSelectComponentSelectFilter from "../../../Common/CustomSelectComponentSelectFilter/CustomSelectComponentSelectFilter";

import groovyWalkAnimation from "../../../../assets/images/LouderAnimation/LouderCapsule.json";
import Lottie from "lottie-react";

export const SearchProductPageComponent = () => {
  const isInit = useRef(false);
  const [filters, setFilters] = useState({});
  const [searchByTitle, setSearchByTitle] = useState("");
  const [page, setPage] = useState(1);
  const [countOfPages, setCountOfPages] = useState(1);

  async function search(page = 1, sortBy) {
    let clone = { ...filters };
    let categories = clone.categories
      ? Object.keys(clone.categories).map((a) =>
        parseInt(clone.categories[a].value)
      )
      : [];
    let brands = clone.brands
      ? Object.keys(clone.brands).map((a) => parseInt(clone.brands[a].value))
      : [];
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
      activeSubstanceId ? activeSubstanceId : null,
      [].concat(
        ...Object.keys(clone).map((a) => convertToServerModel(a, clone[a]))
      ),
      page,
      sortBy ? sortBy : orderBy
    );
    if (searchResult.status === Success) return searchResult.data;
    return null;
  }

  const {
    title,
    categoryId,
    brandId,
    extraParamId,
    extraParamValue,
    activeSubstanceId,
  } = useParams();
  const [isGridTalbeActive, setGridTalbeActive] = useState(true);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  const [pageName, setPageName] = useState("Пошук");
  const [orderByNames, setOrderByNames] = useState([]);
  const [orderBy, setOrderBy] = useState(null);

  const isFirstLoad = useRef(true);

  const handleGridTableClick = (boolean) => {
    setGridTalbeActive(boolean);
  };

  useEffect(() => {
    if (orderByNames) setOrderBy(orderByNames[0]);
  }, [orderByNames]);

  useEffect(() => {
    if (isInit.current)
      updateSearch();
  }, [filters, searchByTitle]);

  async function updateSearch() {
    
    setLoader(StateInfos.LOADING_CONTENT);
    let result = await search();
    if (result) {
      setPage(1);
      setCountOfPages(result.countOfPages);
      setProducts(result.products);
      setLoader(StateInfos.LOADED); 
    }
  }

  async function refresh(sortBy) {
    setPage(1);
    setLoader(StateInfos.LOADING_CONTENT);
    setProducts((await search(1, sortBy)).products);
    setLoader(StateInfos.LOADED);
  }

  useEffect(() => {
    init();
  }, [
    title,
    categoryId,
    brandId,
    extraParamId,
    extraParamValue,
    activeSubstanceId,
  ]);

  async function init() {
    isInit.current = false;
    let res = await Search(
      title,
      categoryId ? [categoryId] : null,
      brandId ? [brandId] : null,
      activeSubstanceId ? parseInt(activeSubstanceId) : null,
      extraParamId && extraParamValue
        ? [{ id: extraParamId, name: extraParamValue }]
        : null
    );
    if (res.status === Success) {
      setProducts(res.data.products);
      setCountOfPages(res.data.countOfPages);
      if (title) {
        setPageName("Пошук");
      } else if (categoryId) {
        let categoryResult = await GetCategoryById(categoryId);
        if (categoryResult.status === Success) {
          setPageName(`Категорія: ${categoryResult.data.title}`);
        }
      } else if (brandId) {
        let brandResult = await getBrandById(brandId);
        if (brandResult.status === Success) {
          setPageName(`Бренд: ${brandResult.data.name}`);
        }
      } else if (activeSubstanceId) {
        let activeSubstanceResult = await getActiveSubstance(activeSubstanceId);
        console.log(activeSubstanceResult);
        if (activeSubstanceResult.status === Success) {
          setPageName(`Діюча речовина: ${activeSubstanceResult.data.title}`);
        }
      }
      setLoader(StateInfos.LOADED);
      isInit.current = true;
      return;
    }
    isInit.current = true;
    setLoader(StateInfos.ERROR);
  }

  if (loader == StateInfos.LOADING) {
    return <Lottie animationData={groovyWalkAnimation} loop={true} />;
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
              setOrderByNames={setOrderByNames}
              search={search}
            />
          }
        </div>

        <div className="col-8">
          <div className="d-flex align-items-center">
            {/* <div className={` ${styles["btn-nav-menu-active"]}`}>
              Список товарі
            </div>
            <div className={`me-4 ms-4 ${styles["btn-nav-menu"]}`}>
              Ціни в аптеках
            </div> */}
            <div className="ms-auto">
              <div className="btn-group">
                <CustomSelectComponentSelectFilter
                  selectedId={orderBy}
                  className={` my-form-select-175 ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
                  options={[
                    ...orderByNames.map((a) => {
                      return { id: a, label: a, value: a };
                    }),
                  ]}
                  onChange={async (e) => {
                    setOrderBy(e.value);
                    await refresh(e.value);
                  }}
                />
              </div>
            </div>
            <div
              onClick={() => handleGridTableClick(true)}
              className="me-3 ms-4 "
              style={{ height: " max-content" }}
            >
              <CardBtn
                className={`  ${isGridTalbeActive ? styles["active"] : styles["no-active"]
                  }`}
              />
            </div>
            <div
              style={{ height: " max-content" }}
              onClick={() => handleGridTableClick(false)}
              т
            >
              <TableBtn
                className={`   ${isGridTalbeActive ? styles["no-active"] : styles["active"]
                  }`}
              />
            </div>
          </div>

          <div
            className={` ${styles["products-area-wrapper"]}  ${isGridTalbeActive ? styles["gridView"] : styles["tableView"]
              }`}
          >
            {/* <MiniCardProductANDTableProductComponent id="1" /> */}
            {
              loader == StateInfos.LOADING_CONTENT ?
                <Lottie className="align-self-center mx-auto" animationData={groovyWalkAnimation} loop={true} /> :
                products &&
                products.length>0 ?
                products
                  .map((a) => (
                    <MiniCardProductANDTableProductComponent
                      key={a.id}
                      id={a.id}
                      isFavorite={isFavoriteProduct}
                      title={a.title}
                      description={a.shortDescription}
                      minPrice={a.minPrice}
                      countOfPharmacies={a.count}
                      manufacturer={a.manufacturer.name}
                      imageUrl={a.pathToPhoto}
                      manufacter={a.manufacter}
                    />
                  )):
                  <div className={`w-100 d-flex justify-content-center align-items-center ${styles["empty-container"]}`}>
                      Нічого не знайдено
                  </div>

            }
          </div>
          <div className="w-100">

            <PaginationComponent
              setContent={setProducts}
              allowAppend={true}
              getContent={async (page) => {
                let res = await search(page);
                if (res) return res.products;
                return null;
              }}
              currentPage={page}
              countOfPages={countOfPages}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>

        <div className="col-12  mt-5 mb-5">
          <img src={baner} style={{ width: "100%" }} />
          {/* <img src={banner} style={{ width: "100%" }} /> */}
        </div>
      </div>
    </>
  );
};
