import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import FooterComponent from "./Footer/FooterComponent";
import "../styles/variables.css";
import "../styles/global.css";
// import SideBarComponnents from "./pages/Admin/components/SideBar/SideBarComponnents";
import LayoutAdmin from "./pages/Admin/LayoutAdmin";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      // <div style={{ height: "1000px" }}>
      <div style={{ height: "100%" }}>
        <LayoutAdmin />
        {/* <NavMenu /> */}
        {/* <Container tag="main">{this.props.children}</Container> */}
        {/* <FooterComponent /> */}
      </div>
    );
  }
}
