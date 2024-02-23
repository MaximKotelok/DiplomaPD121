import React, { useContext } from "react";
import "./LayoutAdmin.css";

import AccordionSideMenuComponent from "./AccordionSideMenu/AccordionSideMenuComponent";
import ButtonSideMenuComponents from "./ButtonSideMenu/ButtonSideMenuComponents";
import Mail from "../../assets/images/mail.svg";
import Question from "../../assets/images/question.svg";
import UsersSvg from "../../assets/images/usersSvg.svg";
import Samsungpass from "../../assets/images/samsungpass.svg";
import Logout from "../../assets/images/Logout.svg";
import Filter from "../../assets/images/filter.svg";
import { ReactComponent as Logo } from "../../assets/images/LogoCapsula.svg";

import AvatarComponennt from "./AvatarComponent/AvatarComponennt";
import BadgeComponennt from "./BadgesComponent/BadgeComponent";
import SearchComponent from "../../components/Common/SearchComponent/SearchComponent";
import LayoutContext from "../LayoutContext";
import { LayoutProviderValues } from "../../utils/Constants";
import { Outlet } from "react-router-dom";
//import TableComponent from "../../components/pages/Admin/components/TableComponents/TableComponent";
// import { Container } from "reactstrap";

const LayoutAdmin = ({ children }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <div
      className={`app-container ${
        layoutContext.stateComponentMounted === LayoutProviderValues.ADD ||
        layoutContext.stateComponentMounted === LayoutProviderValues.UPDATE
          ? "upsert-page"
          : ""
      }`}
    >
      <div className="sidebar ">
        <div className="sidebar-header">
          <div className="app-icon">
            <Logo />
            {/* <SideBarComponnents /> */}
            {/* You can include any content for the app-icon here */}
          </div>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Повідомлення"
              icon={Question}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item active">
            <ButtonSideMenuComponents
              text="Заявки на підтвердження"
              icon={Mail}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Аптеки"
              icon={Filter}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Користувачі"
              icon={UsersSvg}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Фільтри"
              icon={Filter}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <AccordionSideMenuComponent id="2" title="one" />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Браковані серії"
              icon={Samsungpass}
              link="https://www.example.com"
            />
          </li>
        </ul>

        <div className="account-info">
          <ButtonSideMenuComponents
            text="Вийти"
            icon={Logout}
            link="https://www.example.com"
          />
        </div>
      </div>

      <div className="app-content">
        {/* <div className="app-content-header app-content-container  "> */}
        {/* <SearchComponent /> */}
        <div className="app-content-header app-content-container d-flex justify-content-end">
          <div className="app-content-header">
            <BadgeComponennt />
            <AvatarComponennt />
          </div>
        </div>

        <div className="products-area-wrapper tableView">
          {/* <TableComponent /> */}
          {/* {children} */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
