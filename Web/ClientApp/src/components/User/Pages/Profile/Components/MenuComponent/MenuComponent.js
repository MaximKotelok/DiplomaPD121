import React from "react";
import styles from "./Menu.module.css";
import reservation from "../../../../../../assets/images/profile/reservation.svg";
import favoriteProductsImg from "../../../../../../assets/images/profile/favoriteProducts.svg";
import favoritePharmaciesImg from "../../../../../../assets/images/profile/favoritePharmacies.svg";
import recentlyViewedImg from "../../../../../../assets/images/profile/recentlyViewed.svg";
import exitImg from "../../../../../../assets/images/profile/exit.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { removeToken } from "../../../../../../utils/Login";
import { FavouriteProducts, FavouritePharmacies } from "../../../../../../utils/Constants"
var active = ({ isActive }) =>
  isActive
    ? ` d-flex align-items-center ${styles["my-list-group-item"]} ${styles["my-list-group-item-active"]} ${styles["link-text-active"]}`
    : ` d-flex align-items-center ${styles["my-list-group-item"]}`;

const MenuComponent = () => {

  const navigate = useNavigate();
  function OnExit(){  
    removeToken();
      localStorage.removeItem(FavouriteProducts);
      localStorage.removeItem(FavouritePharmacies);
    navigate("/auth");  
  }

  return (
    <ul className={styles["menu-list"]}>
      <li>
        <NavLink to="minebookeds" className={active}>
          <img className={styles["category-icon"]} src={reservation} />
          <a className={`label ${styles["link-text"]} `}> Мої броні </a>
        </NavLink>
      </li>

      <li>
        <NavLink to="selectedproducts" className={active}>
          <img className={styles["category-icon"]} src={favoriteProductsImg} />
          <a className={`label ${styles["link-text"]} `}> Збережені товари </a>
        </NavLink>
      </li>
      <li>
        <NavLink to="mypharmacies" className={active}>
          <img className={styles["category-icon"]} src={favoritePharmaciesImg} />
          <a className={`label ${styles["link-text"]} `}> Мої аптеки </a>
        </NavLink>
      </li>
      <li>
        <NavLink to="wathclist" className={active}>
          <img className={styles["category-icon"]} src={recentlyViewedImg} />
          <a className={`label ${styles["link-text"]} `}> Переглянуті </a>
        </NavLink>
      </li>
      <li className={styles["my-list-group-item"]}>
        <div className="d-flex align-items-center" role="button" onClick={OnExit}>
          <img className={styles["category-icon"]} src={exitImg} />
          <a className={`label ${styles["link-text"]} `}> Вихід </a>
        </div>
      </li>
    </ul>
  );
  /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом
};

export default MenuComponent;
