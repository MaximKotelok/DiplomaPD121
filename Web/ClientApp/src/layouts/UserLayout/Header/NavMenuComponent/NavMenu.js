import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import "./NavMenuMap.css";
import IconButton from "../../../../components/Common/IconButtonComponent/IconButton";
import CatalogIcon from "../../../../assets/images/header-icons/catalogue-icon.svg";
import ServiceIcon from "../../../../assets/images/header-icons/services-icon.svg";
import GeoIcon from "../../../../assets/images/header-icons/geo-icon.svg";
import CartIcon from "../../../../assets/images/header-icons/cart-icon.svg";
import ProfileIcon from "../../../../assets/images/header-icons/profile.svg";
import { ReactComponent as Logo } from "../../../../assets/images/LogoCapsula.svg";
import SearchElement from "../../../../components/Common/SearchComponent/SearchComponent";
import DropDown from "../DropDownComponent/DropDown";
import { checkIsAuth } from "../../../../services/user";
import DropDownLocation from "../DropDownLocationComponent/DropDownLocation";
import AutoCompleteInput from "../../../../components/Common/AutoCompleteInputComponent/AutoCompleteInput ";
import { IconButtonNoText } from "../../../../components/Common/IconButtonNoTextComponent/IconButtonNoText";
import { GetProductByTitle } from "../../../../services/product";
import { DropDownService } from "../DropDownServiceComponent/DropDownService";

//import CatalogIcon from './catalog_icon_215654.svg';
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="custom-navbar border-bottom box-shadow mb-3"
          container
          light
        >
          <div className="inner-custom-navbar navbar-nav flex-grow">
            <NavbarBrand className="logo" tag={Link} to="/">
              <Logo height={40} fill="black" className="logo-pharma" />
            </NavbarBrand>

            <div className="catalogue">
              <DropDown iconPath={CatalogIcon} />
            </div>
            
            <DropDownService />

            <div className="geo me-2">
              <DropDownLocation iconPath={GeoIcon} text="Геолокація" />
            </div>

            <AutoCompleteInput
              className="searchbar"
              getData={(title) => GetProductByTitle(title)}
              onResultClick={(id) => {
                window.location.href = `/product-details/${id}`;
              }}
            />

            <NavLink tag={Link} className="cart nav-link-my" to="/cart">
              <IconButtonNoText iconPath={CartIcon} />
            </NavLink>

            <NavLink
              tag={Link}
              className="profile nav-link-my"
              to={checkIsAuth() ? "/profile" : "/auth"}
            >
              <IconButtonNoText iconPath={ProfileIcon} />
            </NavLink>
          </div>
        </Navbar>
      </header>
    );
  }
}
