import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./Header/NavMenuComponent/NavMenu";
import FooterComponent from "./Footer/FooterComponent/FooterComponent";
import LayoutProvider from "../LayoutProvider";
import LayoutContext from "../LayoutContext";
// import SideBarComponnents from "./pages/Admin/components/SideBar/SideBarComponnents";
import LayoutAdmin from "../AdminLayout/LayoutAdmin";

export class Layout extends Component {
  static displayName = Layout.name;
  static contextType = LayoutContext;

  render() {
    return (
      <div
        className={
          this.context.stateComponentMounted == "map" ? "map-container" : ""
        }
      >
        <NavMenu />
        <Container tag="main">{this.props.children}</Container>
        <FooterComponent />
      </div>
    );
  }
}
