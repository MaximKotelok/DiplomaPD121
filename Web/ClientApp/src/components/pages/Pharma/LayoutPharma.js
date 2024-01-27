import React from "react";
import AccordionSideMenuComponnent from "./components/AccordionSideMenu/AccordionSideMenuComponnent";
import ButtonSideMenuComponennts from "./components/ButtonSideMenu/ButtonSideMenuComponennts";
import "./LayoutPharma.css";
import Mail from "./imgs/tabler-icon-folder-question.svg";
import Question from "./imgs/tabler-icon-mail.svg";
import UsersSvg from "./imgs/tabler-icon-users.svg";
import Samsungpass from "./imgs/tabler-icon-brand-samsungpass.svg";
import Logout from "./imgs/Logout.svg";
import Filter from "./imgs/tabler-icon-filter.svg";
// import LogoSvg from "./imgs/";
// import LogoSvg from "./imgs/";
// import LogoSvg from "./imgs/";

import { ReactComponent as Logo } from "../../../styles/images/LogoCapsula.svg";
import SearchElement from "../../Header/SearchComponent";
import AvatarComponennt from "./components/AvatarComponent/AvatarComponennt";
import BadgeComponennt from "./components/BadgesComponent/BadgeComponent";
import TableComponent from "./components/TableComponents/TableComponent";
import LayoutContext from "../../LayoutContext";
import { useContext } from 'react';

// import { Container } from "reactstrap";

const LayoutPharma = ({ title, children }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className="container-fluid w-100">      
      <div className="row custom-border-bottom d-flex justify-content-beetween align-items-center w-100">
        <div className="col-2 custom-border-right">
          <div className="app-icon-pharma">
            <a href="/">
              <Logo height={40} fill="black" className="logo-pharma" />
            </a>
          </div>
        </div>
        <div className="col-3">
          <p className="product-comment">
            {layoutContext.stateComponentMounted}
          </p>
        </div>
        <div className={`col-7 ${layoutContext.stateComponentMounted ? "p-30" : ""}`}>

          <div className="app-content-header app-content-container-pharma ">

            <div className={`app-content-header`}>
              <BadgeComponennt />
              <AvatarComponennt />
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-2 custom-border-right">
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
        </div>
        <div className="col-6 w-75">
          {children}
        </div>
      </div>
    </div>

  )


};

export default LayoutPharma;
