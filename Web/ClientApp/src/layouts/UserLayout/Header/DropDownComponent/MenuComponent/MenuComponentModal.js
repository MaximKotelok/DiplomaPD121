import React, { useState } from "react";
import styles from "./MenuModal.module.css";
// import liki from "../../../../../assets/images/svg-menu/";
import vitamin from "../../../../../assets/images/svg-menu/Vitamins.svg";
import calyska from "../../../../../assets/images/svg-menu/tabler-icon-baby-carriage.svg";
import girya from "../../../../../assets/images/svg-menu/tabler-icon-barbell.svg";
import animals from "../../../../../assets/images/svg-menu/tabler-icon-paw.svg";
import parfume from "../../../../../assets/images/svg-menu/tabler-icon-perfume.svg";
import physotherapist from "../../../../../assets/images/svg-menu/tabler-icon-physotherapist.svg";
import stethoscope from "../../../../../assets/images/svg-menu/tabler-icon-stethoscope.svg";
import bottle from "../../../../../assets/images/svg-menu/tabler-icon-vaccine-bottle.svg";
import vaccine from "../../../../../assets/images/svg-menu/tabler-icon-vaccine.svg";
// import { NavLink } from "react-router-dom";

var active = ` d-flex align-items-center ${styles["my-list-group-item"]} `;

const MenuComponentModal = ({ onSelect }) => {
  const handleMenuSelect = (menuId) => {
    onSelect(menuId);
  };

  return (
    <ul className={styles["menu-list"]}>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu9")} className={active}>
          <img className={styles["category-icon"]} src={bottle} />
          <a className={`label ${styles["link-text"]} `}>
            Ліки та профілактичні засоби
          </a>
        </div>
      </li>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu1")} className={active}>
          <img className={styles["category-icon"]} src={vitamin} />
          <a className={`label ${styles["link-text"]} `}>
            Вітаміни та мінерали
          </a>
        </div>
      </li>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu7")} className={active}>
          <img className={styles["category-icon"]} src={parfume} />
          <a className={`label ${styles["link-text"]} `}>Краса та догляд</a>
        </div>
      </li>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu2")} className={active}>
          <img className={styles["category-icon"]} src={girya} />
          <a className={`label ${styles["link-text"]} `}>Спорт та здоров'я</a>
        </div>
      </li>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu3")} className={active}>
          <img className={styles["category-icon"]} src={calyska} />
          <a className={`label ${styles["link-text"]} `}>
            Товари для дітей та мам
          </a>
        </div>
      </li>

      <li>
        <div onMouseOver={() => handleMenuSelect("menu10")} className={active}>
          <img className={styles["category-icon"]} src={vaccine} />
          <a className={`label ${styles["link-text"]} `}>
            Вироби медичного призначення
          </a>
        </div>
      </li>

      <li>
        <div onMouseOver={() => handleMenuSelect("menu6")} className={active}>
          <img className={styles["category-icon"]} src={physotherapist} />
          <a className={`label ${styles["link-text"]} `}>
            Ортопедія та реабілітація
          </a>
        </div>
      </li>

      <li>
        <div onMouseOver={() => handleMenuSelect("menu8")} className={active}>
          <img className={styles["category-icon"]} src={stethoscope} />
          <a className={`label ${styles["link-text"]} `}>Медична техніка</a>
        </div>
      </li>
      <li>
        <div onMouseOver={() => handleMenuSelect("menu5")} className={active}>
          <img className={styles["category-icon"]} src={animals} />
          <a className={`label ${styles["link-text"]} `}>Товари для тварин</a>
        </div>
      </li>
    </ul>
  );
  /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом
};

export default MenuComponentModal;
