import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./Header/NavMenuComponent/NavMenu";
import FooterComponent from "./Footer/FooterComponent/FooterComponent";
import LayoutProvider from "../LayoutProvider";
import LayoutContext from "../LayoutContext";
// import SideBarComponnents from "./pages/Admin/components/SideBar/SideBarComponnents";
import LayoutAdmin from "../AdminLayout/LayoutAdmin";
import { Element } from "react-scroll";
import { LayoutProviderValues } from "../../utils/Constants";
import { Outlet } from "react-router-dom";

export class Layout extends Component {
  static displayName = Layout.name;
  static contextType = LayoutContext;

  render() {
    return (
      <div
        className={
          this.context.stateComponentMounted === LayoutProviderValues.MAP
            ? "map-container"
            : ""
        }
      >
        <NavMenu />
        {/* <Container tag="main">{this.props.children}</Container> */}
        <Container tag="main">
          <Outlet />
        </Container>
        <FooterComponent />
      </div>
    );
  }
}
