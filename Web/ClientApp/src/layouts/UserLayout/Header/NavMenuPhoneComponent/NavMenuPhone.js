import React from "react";
import { ReactComponent as Logo } from "../../../../assets/images/LogoCapsula.svg";
import SearchElement from "../../../../components/Common/SearchComponent/SearchComponent";
import styles from "./NavMenuPhone.module.css";
import "../NavMenuComponent/NavMenu.css";
import GeoIcon from "../../../../assets/images/header-icons/geo-icon.svg";
import { Link, NavLink } from "react-router-dom";
import IconButton from "../../../../components/Common/IconButtonComponent/IconButton";
import DropDownLocation from "../DropDownLocationComponent/DropDownLocation";
import { NavbarBrand } from "reactstrap";
import AutoCompleteInput from "../../../../components/Common/AutoCompleteInputComponent/AutoCompleteInput ";
import { GetProductByTitle } from "../../../../services/product";
const NavMenuPhone = () => {
  return (
    <header className={` pb-3 pt-3 mb-3 ${styles["custom-navbar"]}`}>
      <div className="container">
        <div className={` d-flex  justify-content-between`}>
          <NavbarBrand className="logo" tag={Link} to="/">
            <Logo />
          </NavbarBrand>

          {/* <NavLink className="geo" tag={Link} to="/map">
            <IconButton iconPath={GeoIcon} text="Геолокація" />
          </NavLink> */}
          <DropDownLocation iconPath={GeoIcon} text="Геолокація" />
        </div>

        <div className={`d-flex mt-3 `}>
          <AutoCompleteInput
            className={`${styles["searchbar"]}`}
            getData={(title) =>  GetProductByTitle(title)}
            onResultClick={(id) => {
              window.location.href = `/product-details/${id}`;
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default NavMenuPhone;
