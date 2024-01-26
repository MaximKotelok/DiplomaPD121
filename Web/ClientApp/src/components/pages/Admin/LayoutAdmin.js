import React from "react";
import AccordionSideMenuComponnent from "./components/AccordionSideMenu/AccordionSideMenuComponnent";
import ButtonSideMenuComponennts from "./components/ButtonSideMenu/ButtonSideMenuComponennts";
import "./LayoutAdmin.css";
import Mail from "./imgs/tabler-icon-folder-question.svg";
import Question from "./imgs/tabler-icon-mail.svg";
import UsersSvg from "./imgs/tabler-icon-users.svg";
import Samsungpass from "./imgs/tabler-icon-brand-samsungpass.svg";
import Logout from "./imgs/Logout.svg";
import Filter from "./imgs/tabler-icon-filter.svg";
// import LogoSvg from "./imgs/";
// import LogoSvg from "./imgs/";
// import LogoSvg from "./imgs/";

import { ReactComponent as Logo } from "./imgs/LogoCapsula.svg";
import SearchElement from "../../Header/SearchComponent";
import AvatarComponennt from "./components/AvatarComponent/AvatarComponennt";
import BadgeComponennt from "./components/BadgesComponent/BadgeComponent";
import TableComponent from "./components/TableComponents/TableComponent";
// import { Container } from "reactstrap";

const LayoutAdmin = ({children}) => {
  return (
    <div className="app-container">
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
            <ButtonSideMenuComponennts
              text="Повідомлення"
              icon={Question}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item active">
            <ButtonSideMenuComponennts
              text="Заявки на підтвердження"
              icon={Mail}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponennts
              text="Аптеки"
              icon={Filter}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponennts
              text="Користувачі"
              icon={UsersSvg}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponennts
              text="Фільтри"
              icon={Filter}
              link="https://www.example.com"
            />
          </li>
          <li className="sidebar-list-item">
            <AccordionSideMenuComponnent id="2" title="one" />
          </li>
          <li className="sidebar-list-item">
            <ButtonSideMenuComponennts
              text="Браковані серії"
              icon={Samsungpass}
              link="https://www.example.com"
            />
          </li>
        </ul>

        <div className="account-info">
          <ButtonSideMenuComponennts
            text="Вийти"
            icon={Logout}
            link="https://www.example.com"
          />
        </div>
      </div>

      <div className="app-content">
        <div className="app-content-header app-content-container ">
          <SearchElement />
          <div className="app-content-header">
            <BadgeComponennt/>
           <AvatarComponennt/>
          </div>
        </div>

        <div
          className="products-area-wrapper tableView"
     
        >

         <TableComponent/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
