import React, { useState } from "react";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";

import searchIcon from "../../../assets/images/header-icons/search-icon.svg"; // Замініть шлях імпорту на ваш шлях до зображення
import styles from "./AutoCompleteInput.module.css";

const AutoCompleteInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options] = useState([
    "San Francisco",
    "New York",
    "Seattle",
    "Los Angeles",
    "Chicago",
  ]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className={`input-group ${
          searchTerm === ""
            ? styles["border-bottom-none"]
            : styles["border-bottom"]
        } ${styles["input-style-search"]} center back-serach-bar `}
      >
        <button className="social-btn" type="button">
          <img
            src={searchIcon}
            width="28px"
            height="28px"
            alt="My Icon"
            className="icon"
          />
        </button>
        <input
          type="text"
          className="my-search-bar"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      <div style={{ position: "relative", width: "100%" }}>
        {searchTerm && (
          <ul className={`${styles["ul-class"]}`}>
            <hr style={{ margin: "0px" }} />
            <p className={`${styles["pidkazka"]}`}>За назвою товару</p>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  style={{}}
                  className={`${styles["li-class"]} d-flex justify-content-between  align-items-center`}
                  onClick={() => setSearchTerm(option)}
                >
                  <div className="d-flex">
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src="https://root.tblcdn.com/img/goods/8dbb0b8c-a56b-11ea-bab4-000c29ab36d9/1/img_0.jpg?v=AAAAAAjZg0"
                    />
                    <div className="ms-3">
                      <h4 className={`${styles["text-head"]}`}>{option}</h4>
                      <p className={`${styles["text-opus"]}`}>djfgpdolfwe</p>
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
