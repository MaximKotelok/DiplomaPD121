import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomList.css"; // Файл для власних стилів

import placeholder from "../../../../../../assets/images/placeholder.png";
// import placeholder from "../../../assets/images/placeholder.png";
import { ApiPath } from "../../../../../../utils/Constants";

const CustomList = ({ data }) => {
  console.log(data);
  return (
    <ul className="category-list">
      {data && data.map
        ? data.map((a) => {
            return (
              <li key={a.id} className="my-list-group-item">
                <div className="d-flex align-items-center">
                  <img
                    className="category-icon"
                    height={24}
                    width={24}
                    src={
                      a.pathToPhoto ? `${ApiPath}${a.pathToPhoto}` : placeholder
                    }
                  />
                  <span className="label">{a.title}</span>
                </div>
              </li>
            );
          })
        : new Array(9).fill(null).map((_, index) => {
            return;
            <li key={index} className="my-list-group-item">
              <div className="d-flex align-items-center">
                <img
                  className="category-icon"
                  height={24}
                  width={24}
                  src={placeholder}
                />
                <span className="label">...</span>
              </div>
            </li>;
          })}
    </ul>
  );
  /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом
};

export default CustomList;
