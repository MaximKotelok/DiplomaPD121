import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import { Link, useNavigate } from "react-router-dom";

import searchIcon from "../../../assets/images/header-icons/search-icon.svg"; // Замініть шлях імпорту на ваш шлях до зображення
import styles from "./AutoCompleteInput.module.css";
import { ApiPath, Success } from "../../../utils/Constants";

const AutoCompleteInput = ({ className, getData, onResultClick }) => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value !== "") {
      let res = await getData(event.target.value);
      if (res.status === Success) setDataFromServer(res.data);
    } else {
      setDataFromServer([]);
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <div
        className={`input-group ${
          searchTerm.length===0 || !isFocused
            ? styles["border-bottom-none"]
            : styles["border-bottom"]
        } ${styles["input-style-search"]} center ${
          styles["product-back-serach-bar"]
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
          className="my-search-bar"
          placeholder="Пошук..."
          value={searchTerm}
          onInput={handleChange}
          onKeyUp={(e)=>{
            if (e.keyCode === 13){
              navigate(`/Search/ByTitle/${searchTerm}`);
              setSearchTerm("");
            }
          }}
        />
      </div>

      <div style={{ position: "relative", maxWidth: "621px" }}>
        {searchTerm.length>0 && isFocused && (
          <ul className={`${styles["ul-class"]}`}>
            <hr style={{ margin: "0px" }} />
            <p className={`${styles["pidkazka"]}`}>За назвою товару</p>
            {dataFromServer.length > 0 ? (
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
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
