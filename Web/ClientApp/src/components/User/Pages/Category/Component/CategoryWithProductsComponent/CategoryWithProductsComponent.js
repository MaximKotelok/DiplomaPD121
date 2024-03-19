import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetCategoryById,
  GetCategoryProductsForFilter,
} from "../../../../../../services/category";
import { StateInfos, Success } from "../../../../../../utils/Constants";
import { initFavs, isFavorite } from "../../../../../../utils/Functions";

import styles from "./CategoryWithSubCategoriesComponent.module.css";
import ProductFilterComponent from "../../../../../Common/ProductFilterComponent/ProductFilterComponent";
import MiniProductCardComponent from "../../../../../Common/MiniProductCardComponent/MiniProductCardComponent";
import { ReactComponent as CardBtn } from "../../../../../../assets/images/category/Card.svg";
import { ReactComponent as TableBtn } from "../../../../../../assets/images/category/Table.svg";
import MiniCardProductANDTableProductComponent from "../../../../../Common/MiniCardProductANDTableProductComponent/MiniCardProductANDTableProductComponent";

export const CategoryWithProductsComponent = () => {
  const categoriesPerPage = 4;

  const { id, currentPageParam } = useParams();
  const [category, setCategory] = useState(null);
  const [favs, setFavs] = useState(null);
  const [isGridTalbeActive, setGridTalbeActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxOfCategories, setMaxOfCategories] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loader, setLoader] = useState(StateInfos.LOADING);

  const handleGridTableClick = (boolean) => {
    setGridTalbeActive(boolean);
  };

  useEffect(() => {
    init();
    initFavs(setFavs);
  }, [id]);

  async function init() {
    let category = await GetCategoryById(id);
    if (currentPageParam) setCurrentPage(currentPageParam);
    if (category.status == Success) {
      setCategory(category.data);
      setMaxOfCategories(category.data.count);
      setLoader(StateInfos.LOADED);

      let res = (await GetCategoryProductsForFilter(id, 0, 999)).data;
      setProducts(res);
      setFilteredProducts(res);
      return;
    }
    setLoader(StateInfos.ERROR);
  }

  function calculateRange(pageNumber, itemsPerPage) {
    var n = 0;

    var startNumber = (pageNumber - 1) * categoriesPerPage + n;
    var endNumber = pageNumber * itemsPerPage;

    return {
      startNumber: startNumber,
      endNumber: endNumber,
    };
  }

  if (loader == StateInfos.LOADING) {
    return <>Loading</>;
  } else if (loader == StateInfos.ERROR) {
    return <>Error</>;
  }

  return (
    <>
      <p className={`${styles["category-header"]}`}>{category.title}</p>
      <hr />
      <div className="row">
        <div className="col-3">
          {
            <ProductFilterComponent
              products={products}
              setProducts={setFilteredProducts}
            />
          }
        </div>

        <div className="col-9">
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

            {filteredProducts && filteredProducts.map
              ? filteredProducts.map((a) => (
                  <MiniCardProductANDTableProductComponent
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
                    <MiniCardProductANDTableProductComponent key={index} />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};
