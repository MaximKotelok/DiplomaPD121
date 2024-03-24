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
            <NavLink className="services" tag={Link} to="/counter">
              <IconButton iconPath={ServiceIcon} text="Сервіси" />
            </NavLink>

            <div className="geo">
              <DropDownLocation iconPath={GeoIcon} text="Геолокація" />
            </div>

            {/* <SearchElement className="searchbar" /> */}
            <AutoCompleteInput className="searchbar" />

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

//import React, { Component } from 'react';
////import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Input } from 'reactstrap';

//import { Link } from 'react-router-dom';
//import './NavMenu.css';

//export class NavMenu extends Component {
//    static displayName = NavMenu.name;

//    constructor(props) {
//        super(props);

//        this.toggleNavbar = this.toggleNavbar.bind(this);
//        this.state = {
//            collapsed: true
//        };
//    }

//    toggleNavbar() {
//        this.setState({
//            collapsed: !this.state.collapsed
//        });
//    }

//    render() {
//        return (
//            <header>
//                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//                    <NavbarBrand tag={Link} to="/">�������</NavbarBrand>
//                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//                        <Nav className="ml-auto" navbar>
//                            <NavItem>
//                                <div className="nav-link">
//                                    (icon) �������
//                                </div>
//                            </NavItem>
//                            <NavItem>
//                                <div className="nav-link">
//                                    (icon) ������
//                                </div>
//                            </NavItem>
//                            <NavItem>
//                                <div className="nav-link">
//                                    (icon) ����������
//                                </div>
//                            </NavItem>
//                            <NavItem>
//                                <Input type="text" placeholder="�����" className="nav-link" />
//                            </NavItem>
//                            <NavItem>
//                                <div className="nav-link">
//                                    (icon) �������
//                                </div>
//                            </NavItem>
//                            <NavItem>
//                                <div className="nav-link">
//                                    (icon) ������
//                                </div>
//                            </NavItem>
//                        </Nav>
//                    </Collapse>
//                </Navbar>
//            </header>
//        );
//    }
//}
