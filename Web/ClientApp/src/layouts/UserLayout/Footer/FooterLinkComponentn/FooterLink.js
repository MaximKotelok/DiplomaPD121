import { NavLink } from "react-router-dom";

import styles from "./FooterLink.module.css"

export const FooterLink = ({ href, text, target = "" }) => (

       <li className={`${styles["li-acordeon"]} ${styles["tr"]} nav-item mb-2`}>
      <NavLink target={target} to={href} className={` ${styles["text-link-footer"]} nav-link  p-0 text-dark`}>
        {text}
      </NavLink>
    </li>
  );