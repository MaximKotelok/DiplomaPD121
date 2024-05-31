import React from "react";
import styles from "./MenuBottomPhone.module.css";
import { ReactComponent as Cart } from "../../../../assets/images/header-phone-icons/Cart.svg";
import { ReactComponent as Account } from "../../../../assets/images/header-phone-icons/Account.svg";
import { ReactComponent as TablerCategory } from "../../../../assets/images/header-phone-icons/tabler-icon-category.svg";
import { ReactComponent as TablerHome } from "../../../../assets/images/header-phone-icons/tabler-icon-home.svg";
import BtnPhoneMenuBottom from "./BtnPhoneMenuBottomCompoenet/BtnPhoneMenuBottom";
import { NavLink, useLocation } from "react-router-dom";

const MenuBottomPhone = () => {
  // const location = useLocation();
  // const isActiveAuth = location.pathname.startsWith("/auth");

  return (
    <div
      className={` pb-3 pt-3  ${styles["custom-navbar"]} ${styles["fixed-bottom"]}`}
    >
      <div className="container d-flex  justify-content-around">
        {/* <BtnPhoneMenuBottom to="/" text="Головна" iconPath={TablerHome} /> */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `d-flex align-items-center flex-column justify-content-center ${
              styles.navLink
            } ${isActive && styles["navLink-active"]}`
          }
        >
          <TablerHome />

          <p className={`${styles["text-bottom"]}`}>Головна</p>
        </NavLink>

        <NavLink
          to="/category/1"
          className={({ isActive }) =>
            `d-flex align-items-center flex-column justify-content-center ${
              styles.navLink
            } ${isActive && styles["navLink-active"]}`
          }
        >
          <TablerCategory />

          <p className={`${styles["text-bottom"]}`}>Каталог</p>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `d-flex align-items-center flex-column justify-content-center ${
              styles.navLink
            } ${isActive && styles["navLink-active"]}`
          }
        >
          <Cart />
          <p className={`${styles["text-bottom"]}`}>Кошик</p>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `d-flex align-items-center flex-column justify-content-center ${
              styles.navLink
            } ${isActive && styles["navLink-active"]} `
          }
        >
          <Account />
          <p className={`${styles["text-bottom"]}`}>Профіль</p>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuBottomPhone;
