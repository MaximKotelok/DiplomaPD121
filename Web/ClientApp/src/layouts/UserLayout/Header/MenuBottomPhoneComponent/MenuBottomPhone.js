import React from "react";
import styles from "./MenuBottomPhone.module.css";
import Cart from "../../../../assets/images/header-phone-icons/Cart.svg";
import Account from "../../../../assets/images/header-phone-icons/Account.svg";
import TablerCategory from "../../../../assets/images/header-phone-icons/tabler-icon-category.svg";
import TablerHome from "../../../../assets/images/header-phone-icons/tabler-icon-home.svg";
import BtnPhoneMenuBottom from "./BtnPhoneMenuBottomCompoenet/BtnPhoneMenuBottom";

const MenuBottomPhone = () => {
  return (
    <div
      className={` pb-3 pt-3  ${styles["custom-navbar"]} ${styles["fixed-bottom"]}`}
    >
      <div className="container d-flex  justify-content-around">
        <BtnPhoneMenuBottom to="/" text="Головна" iconPath={TablerHome} />
        <BtnPhoneMenuBottom to="/" text="Каталог" iconPath={TablerCategory} />
        <BtnPhoneMenuBottom to="/" text="Кошик" iconPath={Cart} />
        <BtnPhoneMenuBottom to="/" text="Профіль" iconPath={Account} />
      </div>
    </div>
  );
};

export default MenuBottomPhone;
