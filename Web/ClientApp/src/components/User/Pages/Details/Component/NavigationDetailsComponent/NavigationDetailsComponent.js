import React, { useEffect, useState } from 'react';
import styles from "./NavigationDetailsComponent.module.css";
import { Link } from 'react-scroll';

export const NavigationDetailsComponent = ({data}) => {

    return (
        <div className={`${styles["product-nav"]} w-100`}>
            {data.map((a,index) => {
                return (
                    <Link key={index} to={a.anchorName} spy={true} duration={500}>
                        {a.title}
                    </Link>
                )
            })}
        </div>
    );
}
