import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./CustomList.css"; // Файл для власних стилів

import placeholder from "../../../../../../assets/images/placeholder.png";
// import placeholder from "../../../assets/images/placeholder.png";
import { ApiPath } from "../../../../../../utils/Constants";
import styles from "./CustomList.module.css";

import {  
  Link,
} from 'react-router-dom';
var active = ` d-flex align-items-center ${styles["my-list-group-item"]} `;

const CustomList = ({ data }) => {
  return (
    // Поста іконки норм а то я шось не поняв як ти робив а шукати часу не було

    <ul className={styles["menu-list"]}>
      {data && data.map
        ? data.map((a) => {
            return (
              
              <li key={a.id} style={{ margin: "14px 0" }}>
              <Link to={`/category/${a.id}`}>
              <div className={active}>
                <img
                  className={styles["category-icon"]}
                  height={24}
                  width={24}
                  src={
                    a.pathToPhoto ? `${ApiPath}${a.pathToPhoto}` : placeholder
                  }
                />

                <a className={`label ${styles["link-text"]} `}>{a.title}</a>
              </div>
              </Link>
            </li>
            );
          })
        : new Array(9).fill(null).map((_, index) => {
            return;
            <li key={index} className="my-list-group-item">
              <div className="d-flex align-items-center">
                <img
                  className={styles["category-icon"]}
                  height={24}
                  width={24}
                  src={placeholder}
                />
                <a className={`label ${styles["link-text"]} `}>...</a>
              </div>
            </li>;
          })}
    </ul>
  );
};

export default CustomList;
