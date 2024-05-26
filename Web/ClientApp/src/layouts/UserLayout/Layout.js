import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./Header/NavMenuComponent/NavMenu";
import FooterComponent from "./Footer/FooterComponent/FooterComponent";
import LayoutProvider from "../LayoutProvider";
import LayoutContext from "../LayoutContext";
// import SideBarComponnents from "./pages/Admin/components/SideBar/SideBarComponnents";
import LayoutAdmin from "../AdminLayout/LayoutAdmin";
import styles from "./Layout.module.css";
import { Element } from "react-scroll";
import { LayoutProviderValues } from "../../utils/Constants";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import NavMenuPhone from "./Header/NavMenuPhoneComponent/NavMenuPhone";
import MenuBottomPhone from "./Header/MenuBottomPhoneComponent/MenuBottomPhone";

export class Layout extends Component {
  static displayName = Layout.name;
  static contextType = LayoutContext;

  state = {
    isMobile: false,
    isWideScreen: window.innerWidth > 1200,
  };

  componentDidMount() {
    // Check screen width when the component mounts
    this.checkScreenWidth();

    // Add an event listener to check screen width on window resize
    window.addEventListener("resize", this.checkScreenWidth);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Remove the event listener when the component is unmounted
    window.removeEventListener("resize", this.checkScreenWidth);
    window.removeEventListener("resize", this.handleResize);
  }

  // Function to check screen width and update the state
  checkScreenWidth = () => {
    this.setState({ isMobile: window.innerWidth <= 767 });
    this.setState({ isWideScreen: window.innerWidth > 1200 });
  };

  render() {
    return (
      <div
        className={
          this.context.stateComponentMounted === LayoutProviderValues.MAP
            ? "map-container"
            : ""
        }
      >
        {this.state.isMobile ? <NavMenuPhone /> : <NavMenu />}
        {/* <div className={`${this.state.isWideScreen && "container" }`} tag="main">
          <Outlet />
        </div> */}
        <Container
          className={
            this.context.stateComponentMounted === LayoutProviderValues.MAP
              ? ""
              : !this.state.isWideScreen && styles["my-class-container"]
          }
          tag="main"
        >
          <Outlet />
        </Container>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />

        
        <FooterComponent />

        {this.state.isMobile && <MenuBottomPhone />}
      </div>
    );
  }
}
