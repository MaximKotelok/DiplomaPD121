import React, { useContext } from "react";
import "./LayoutAdmin.css";

import AccordionSideMenuComponent from "./AccordionSideMenu/AccordionSideMenuComponent";
import ButtonSideMenuComponents from "./ButtonSideMenu/ButtonSideMenuComponents";
import Mail from "../../assets/images/mail.svg";
import Question from "../../assets/images/question.svg";
import UsersSvg from "../../assets/images/usersSvg.svg";
import Samsungpass from "../../assets/images/samsungpass.svg";
import Logout from "../../assets/images/Logout.svg";
import Pharmacy from "../../assets/images/layout-Admin/pharmacy-icon.svg";
import HomeIcon from "../../assets/images/layout-Admin/Home-page-admin.svg";
import Defective from "../../assets/images/layout-Admin/defective-SeriesList.svg";
import Messag from "../../assets/images/layout-Admin/Messag-admin.svg";
import Filter from "../../assets/images/filter.svg";
import { ReactComponent as Logo } from "../../assets/images/LogoCapsula.svg";

import AvatarComponennt from "./AvatarComponent/AvatarComponennt";
import BadgeComponennt from "./BadgesComponent/BadgeComponent";
import SearchComponent from "../../components/Common/SearchComponent/SearchComponent";
import LayoutContext from "../LayoutContext";
import {
  FavouritePharmacies,
  FavouriteProducts,
  LayoutProviderValues,
} from "../../utils/Constants";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
//import TableComponent from "../../components/pages/Admin/components/TableComponents/TableComponent";
// import { Container } from "reactstrap";

import "react-toastify/dist/ReactToastify.css";
import { removeToken } from "../../utils/Login";

const ListMenejment = [
  {
    text: "Атрибути",
    link: "/admin/attributeList",
  },
  {
    text: "Бренд",
    link: "/admin/brandList",
  },
  {
    text: "Виробник",
    link: "/admin/manufactureList",
  },
  {
    text: "Діюча речовина",
    link: "/admin/activeSubstanceList",
  },
  {
    text: "Категорії",
    link: "/admin/categoeyList",
  },
  {
    text: "Товар",
    link: "/admin/productList",
  },
];

const ListMenejmentPharmacy = [
  {
    text: "Броні",
    link: "/admin/orderList",
  },
  {
    text: "Товар",
    link: "/admin/productConcreatList",
  },
];

const LayoutAdmin = ({ children }) => {
  const layoutContext = useContext(LayoutContext);
  const navigate = useNavigate();
  function OnExit() {
    removeToken();
    localStorage.removeItem(FavouriteProducts);
    localStorage.removeItem(FavouritePharmacies);
    navigate("/auth");
  }

  return (
    <div className={`app-container`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="app-icon">
            <Logo />
            {/* <SideBarComponnents /> */}
            {/* You can include any content for the app-icon here */}
          </div>
        </div>

        <ul className="sidebar-list">
          {/* <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Повідомлення"
              icon={Question}
              link="https://www.example.com"
            />
          </li> */}

          {/* ------------------АДМІН------------------ */}

          {/* <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Головна"
              icon={HomeIcon}
              link="/admin/homePageAdmin"
            />
          </li>
          <li className="sidebar-list-item active">
            <ButtonSideMenuComponents
              text="Повідомлення"
              icon={Messag}
              link="/admin/supportChat"
            />
          </li>
          <li className="sidebar-list-item active">
            <ButtonSideMenuComponents
              text="Заявки на підтвердження"
              icon={Mail}
              link="/admin/zayavkaList"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Аптеки"
              icon={Pharmacy}
              link="/admin/pharmacyList"
              className="button-icon-pharmacy"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Користувачі"
              icon={UsersSvg}
              link="/admin/userList"
            />
          </li>

          <li className="sidebar-list-item">
            <AccordionSideMenuComponent
              id="2"
              title="one"
              ListMenejment={ListMenejment}
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Браковані серії"
              icon={Defective}
              link="/admin/defectiveSeriesList"
            />
          </li> */}

          {/* ------------------ФАрмацевт------------------ */}

          {/* <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Головна"
              icon={HomeIcon}
              link="/admin/homePageAdmin"
            />
          </li>
          <li className="sidebar-list-item active">
            <ButtonSideMenuComponents
              text="Повідомлення"
              icon={Messag}
              link="/admin/supportChat"
            />
          </li>

          <li className="sidebar-list-item">
            <AccordionSideMenuComponent
              id="2"
              title="one"
              ListMenejment={ListMenejmentPharmacy}
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Браковані серії"
              icon={Defective}
              link="/admin/defectiveSeriesList"
            />
          </li> */}

          {/* ------------------Фарма компанія------------------ */}
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Головна"
              icon={HomeIcon}
              link="/admin/homePageAdmin"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Добавлення новго товару"
              icon={HomeIcon}
              link="/admin/addProduct"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Товари"
              icon={HomeIcon}
              link="/admin/productInspection"
            />
          </li>

          <li className="sidebar-list-item active">
            <ButtonSideMenuComponents
              text="Повідомлення"
              icon={Messag}
              link="/admin/supportChat"
            />
          </li>

          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Аптеки"
              icon={Pharmacy}
              link="/admin/pharmacyList"
              className="button-icon-pharmacy"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponents
              text="Браковані серії"
              icon={Defective}
              link="/admin/defectiveSeriesList"
            />
          </li>
        </ul>

        <div className="account-info">
          <ButtonSideMenuComponents
            text="Вийти"
            link="/exit"
            icon={Logout}
            onClick={OnExit}
          />
        </div>
      </div>

      <div className="app-content admin-layout-padding-left">
        <div className="app-content-header app-content-container  d-flex">
          {/* <SearchComponent /> */}
          {layoutContext.additonalComponent}

          <div className="app-content-header ms-auto">
            <BadgeComponennt />
            <AvatarComponennt />
          </div>
        </div>

        {/* <div className="products-area-wrapper tableView"> */}
        {/* <TableComponent /> */}
        {/* {children} */}
        <Outlet />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default LayoutAdmin;
