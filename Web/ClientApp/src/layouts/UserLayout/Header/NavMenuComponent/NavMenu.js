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
import IconButton from "../../../../components/Common/IconButtonComponent/IconButton";
import CatalogIcon from "../../../../assets/images/catalog_icon_215654.ico";
import { ReactComponent as Logo } from "../../../../assets/images/LogoCapsula.svg";
import SearchElement from "../../../../components/Common/SearchComponent/SearchComponent";
import ServiceIcon from "../../../../assets/images/service.svg";
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
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/">
            <Logo height={40} fill="black" className="logo-pharma" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  <IconButton iconPath={CatalogIcon} text="Каталог" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">
                  <IconButton iconPath={ServiceIcon} text="Сервіси" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/map">
                  <IconButton iconPath={ServiceIcon} text="Геолокація" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink>
                  <SearchElement />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">
                  <IconButton iconPath={ServiceIcon} text="Корзина" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">
                  <IconButton iconPath={ServiceIcon} text="Акаунт" />
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
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
