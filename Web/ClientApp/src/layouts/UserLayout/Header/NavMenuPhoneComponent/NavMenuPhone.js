import React from "react";
import { ReactComponent as Logo } from "../../../../assets/images/LogoCapsula.svg";
import SearchElement from "../../../../components/Common/SearchComponent/SearchComponent";
import styles from "./NavMenuPhone.module.css";
import GeoIcon from "../../../../assets/images/header-icons/geo-icon.svg";
import { Link, NavLink } from "react-router-dom";
import IconButton from "../../../../components/Common/IconButtonComponent/IconButton";

const NavMenuPhone = () => {
  return (
    <header className={` pb-3 pt-3 mb-3 ${styles["custom-navbar"]}`}>
      <div className="container">
        <div className={` d-flex  justify-content-between`}>
          <Logo />
          <NavLink className="geo" tag={Link} to="/map">
            <IconButton iconPath={GeoIcon} text="Геолокація" />
          </NavLink>
        </div>

        <div className={`d-flex mt-3 `}>
          <SearchElement className={`flex-fill`} />
        </div>
      </div>
    </header>
  );
};

export default NavMenuPhone;
