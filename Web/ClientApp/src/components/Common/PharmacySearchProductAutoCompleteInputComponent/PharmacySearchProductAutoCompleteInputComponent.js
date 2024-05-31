import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import { Link } from "react-router-dom";

import searchIcon from "../../../assets/images/header-icons/search-icon.svg"; // Замініть шлях імпорту на ваш шлях до зображення
import styles from "./PharmacySearchProductAutoCompleteInputComponent.module.css";
import { ApiPath, Success } from "../../../utils/Constants";
import CustomImgComponent from "../CustomImgComponent/CustomImgComponent";
import { addToCart } from "../../../services/cartService";
import { toast } from "react-toastify";
const PharmacySearchProductAutoCompleteInputComponent = ({
  className,
  getData,
  pharmacyId
}) => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = async (event) => {
    setIsFocused(true)
    setSearchTerm(event.target.value);
    if (event.target.value !== "") {
      let res = await getData(event.target.value);
      if (res.status === Success) setDataFromServer(res.data);
    } else {
      setDataFromServer([]);
    }
  };
  const handleReserve = (id) => {
    addToCart(pharmacyId, id);
    toast.success("Товар додано до кошика");
  };
  useEffect(()=>{
    const onClickOutside = (e) => {
      if (e && e.target && e.target.className && e.target.className.includes && !e.target.className.includes("search-box")) {
        setIsFocused(false);
      }
    };
    window.addEventListener("click", onClickOutside);

    return ()=>{
      
      window.removeEventListener("click", onClickOutside);
    }

  },[])
  return (
    <Link to=""
      className={`${className} w-100 search-box`}
    >
      <div
        className={`  ${styles["my-w-100"]} input-group ${searchTerm.length == 0 || !isFocused
          ? styles["border-bottom-none"]
          : styles["border-bottom"]
          } ${styles["input-style-search"]} center ${styles["product-back-serach-bar"]
          } back-serach-bar `}
      >
        <Link to={`/Search/ByTitle/${searchTerm}`} className="btn social-btn">
          <img
            src={searchIcon}
            width="28px"
            height="28px"
            alt="My Icon"
            className="icon"
          />
        </Link>
        <input
          type="text"
          className="my-search-bar w-100"
          placeholder="Пошук товару у цій аптеці"
          // value={searchTerm}
          onInput={handleChange}
        />
      </div>
      

      <div style={{ position: "relative", maxWidth: "100%" }}>
        {searchTerm.length > 0 && isFocused && (
          <ul className={`${styles["ul-class"]}`}>
            <hr style={{ margin: "0px" }} />
            <p className={`${styles["pidkazka"]}`}>За назвою товару</p>
            {
              dataFromServer.length > 0 ? dataFromServer.map(product => {

                return (<div className="d-flex mt-3">
                <CustomImgComponent
                  style={{ width: "60px", height: "60px" }}
                  src={`${ApiPath}${product.product.pathToPhoto}`}
                  // src={`${ApiPath}${option.pathToPhoto}`}
                />
                <div className="ms-3 d-flex flex-column">
                  <h4 className={`${styles["text-head"]}`}>{product.product.title}</h4>
                  {/* <h4 className={`${styles["text-head"]}`}>{option.title}</h4> */}
                  <p className={` mt-auto ${styles["text-opus"]}`}>
                  {product.product.shortDescription}
                    {/* {option.shortDescription} */}
                  </p>
                </div>
                <div className={`ms-auto`} style={{ maxWidth: "160px" }}>
                  <h4 className={`${styles["text-grn"]}`}>{product.price.toFixed(2)} грн</h4>
                  <button
                    className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                    onClick={()=>{
                      handleReserve(product.id)
                    }}
                  >
                    Добавити у кошик
                  </button>
                </div>
              </div>

                )
              }) : (<li
                style={{
                  listStyleType: "none",
                  padding: "10px",
                }}
                className={`${styles["sory-text"]}`}
              >
                Вибачте, результатів немає
              </li>)
            }

          </ul>)}
      </div>


      {/* {dataFromServer.length > 0 ? (
              dataFromServer.map((option, index) => (
                <li
                key={index}
                  style={{}}
                  className={`${styles["li-class"]} d-flex justify-content-between  align-items-center`}
                  onClick={() => {
                    onResultClick(option.id);

                    setSearchTerm("");
                  }}
                >
                  <div className="d-flex">
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={`${ApiPath}${option.pathToPhoto}`}
                    />
                    <div className="ms-3">
                      <h4 className={`${styles["text-head"]}`}>
                        {option.title}
                      </h4>
                      <p className={`${styles["text-opus"]}`}>
                        {option.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ArrowRight />
                </li>
              ))
            ) : (
              <li
                style={{
                  listStyleType: "none",
                  padding: "10px",
                }}
                className={`${styles["sory-text"]}`}
              >
                Вибачте, результатів немає
              </li>
            )} */}

    </Link >
  );
};

export default PharmacySearchProductAutoCompleteInputComponent;
