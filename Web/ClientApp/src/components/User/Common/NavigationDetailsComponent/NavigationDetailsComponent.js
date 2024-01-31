import React, { useEffect, useState } from 'react';
import styles from "./NavigationDetailsComponent.module.css";
import { Link, NavLink } from 'react-router-dom';


export const NavigationDetailsComponent = ({ id }) => {
    return (
        <div className={`${styles["product-nav"]} w-100 font-map-14`}>

            <NavLink to={`/product-details/${id}#head`}
                className={({ isActive }) => (isActive ? styles["active"]:"")}
            >
                Про товар
            </NavLink>
            <NavLink to={`/map/${id}`} className={({ isActive }) => (isActive ? styles["active"]:"")}>
                Ціни в аптеках
            </NavLink>
            <Link to={`/product-details/${id}#instruction`}>Інструкція</Link>
            <Link to={`/product-details/${id}#characteristic`}>Характеристики</Link>
            <Link to={`/analugues/${id}`}>Аналоги</Link>
            <Link to={`/product-details/${id}#questions`}>Часті питання</Link>
        </div >
    );
}
