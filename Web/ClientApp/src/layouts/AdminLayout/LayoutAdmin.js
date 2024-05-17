import React, { useContext, useEffect, useState } from "react";
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
  Role_Admin,
  Role_PharmaCompany,
  Role_Pharmacist,
  Success,
} from "../../utils/Constants";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
//import TableComponent from "../../components/pages/Admin/components/TableComponents/TableComponent";
// import { Container } from "reactstrap";

import "react-toastify/dist/ReactToastify.css";
import { removeToken } from "../../utils/Login";
import { getMyInfo } from "../../services/user";
import { ActiveSubstanceListPath, AttributeListPath, BrandListPath, CategoryListPath, ConcreteProductListPath, ManufacturerListPath, OrderListPath, PharmaCompanyPharmacyListPath, PharmacyListPath, ProductConfirmListPath, ProductListPath, UserListPath } from "../../utils/TablesPathes";

const ListMenejment = [
  {
    text: "Атрибути",
    link: `/admin/${AttributeListPath}`,
  },
  {
    text: "Бренд",
    link:  `/admin/${BrandListPath}`,
  },
  {
    text: "Виробник",
    link:  `/admin/${ManufacturerListPath}`,
  },
  {
    text: "Діюча речовина",
    link:  `/admin/${ActiveSubstanceListPath}`,
  },
  {
    text: "Категорії",
    link:  `/admin/${CategoryListPath}`,
  },
  {
    text: "Товар",
    link:  `/admin/${[ProductListPath]}`,
  },
];

const ListMenejmentPharmacy = [
  {
    text: "Броні",
    link:  `/admin/${OrderListPath}`,
  },
  {
    text: "Товар",
    link: `/admin/${ConcreteProductListPath}`,
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

  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    init();
  }, []);


  async function init() {
    let userInfoFromServer = {};
    let res = await getMyInfo();
    if (res.status == Success) {
      if (res.data.firstName && res.data.lastName) {
        userInfoFromServer.name = `${res.data.firstName} ${res.data.lastName}`;
      }
      else {
        userInfoFromServer.name = res.data.email;
      }
      userInfoFromServer.role = res.data.role;
      userInfoFromServer.pathToPhoto = res.data.pathToPhoto;
      setUserInfo(userInfoFromServer);
    }
  }
  if(!userInfo)
  return "Loading...";

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
          {(userInfo.role === Role_Admin && <>
            <li className="sidebar-list-item">
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
                link={`/admin/${ProductConfirmListPath}`}
              />
            </li>
            <li className="sidebar-list-item">
              <ButtonSideMenuComponents
                text="Аптеки"
                icon={Pharmacy}
                link={`/admin/${PharmacyListPath}`}
                className="button-icon-pharmacy"
              />
            </li>
            <li className="sidebar-list-item">
              <ButtonSideMenuComponents
                text="Користувачі"
                icon={UsersSvg}
                link={`/admin/${UserListPath}`}
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
            </li>
          </>)}


          {/* ------------------Фармацевт------------------ */}
          {(userInfo.role === Role_Pharmacist && <>
            <li className="sidebar-list-item">
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
            </li>
          </>
          )
          }

          {/* ------------------Фарма компанія------------------ */}
          {(userInfo.role === Role_PharmaCompany && <>
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
                link={`/admin/${PharmaCompanyPharmacyListPath}`}
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
          </>
          )
          }
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
            <AvatarComponennt userInfo={userInfo} />
          </div>
        </div>

        {/* <div className="products-area-wrapper tableView"> */}
        {/* <TableComponent /> */}
        {/* {children} */}
        <Outlet />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar/>
    </div>
  );
};

export default LayoutAdmin;
