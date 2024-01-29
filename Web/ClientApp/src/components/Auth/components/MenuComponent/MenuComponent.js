import React from "react";
import styles from "./Menu.module.css";
// import styles from "./Menu.module.css";

// import placeholder from "../../../../../../assets/images/placeholder.png";
import placeholder from "../../../../assets/images/placeholder.png";
import shpruc from "../../../../assets/images/shpruc.svg";
// import { ApiPath } from "../../../../../../utils/Constants";

const MenuComponent = () => {
  return (
    <ul className={styles["menu-list"]}>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center">
          <img
            // className="category-icon"
            className={styles["category-icon"]}
            src={shpruc}
            // src={
            //    ? `${ApiPath}${a.pathToPhoto}` : placeholder
            // }
          />
        <a className={`label ${styles["link-text"]} `}> Вхід </a>
        </div>
      </li>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center">
          <img
            // className="category-icon"
            className={styles["category-icon"]}
            src={shpruc}
            // src={
            //    ? `${ApiPath}${a.pathToPhoto}` : placeholder
            // }
          />
        <a className={`label ${styles["link-text"]} `}> Вихід </a>
        </div>
      </li>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center">
          <img
            // className="category-icon"
            className={styles["category-icon"]}
            src={shpruc}
            // src={
            //    ? `${ApiPath}${a.pathToPhoto}` : placeholder
            // }
          />
        <a className={`label ${styles["link-text"]} `}> Вхід </a>
        </div>
      </li>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center">
          <img
            // className="category-icon"
            className={styles["category-icon"]}
            src={shpruc}
            // src={
            //    ? `${ApiPath}${a.pathToPhoto}` : placeholder
            // }
          />
        <a className={`label ${styles["link-text"]} `}> Вихід </a>
        </div>
      </li>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center">
          <img
            // className="category-icon"
            className={styles["category-icon"]}
            src={shpruc}
            // src={
            //    ? `${ApiPath}${a.pathToPhoto}` : placeholder
            // }
          />
        <a className={`label ${styles["link-text"]} `}> Вихід </a>
        </div>
      </li>

      {/* {data && data.map
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
          })} */}
    </ul>
  );
  /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом
};

export default MenuComponent;
