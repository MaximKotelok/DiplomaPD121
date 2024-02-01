import React, { useEffect, useState } from 'react';
import styles from "./NavigationDetailsComponent.module.css";
import { Link, NavLink } from 'react-router-dom';
import "jquery"
import "bootstrap"


export const NavigationDetailsComponent = ({ id }) => {
    const links = [
        (<NavLink to={`/product-details/${id}#head`} className={({ isActive }) => (isActive ? styles["active"] : "")}>Про товар</NavLink>),
        (<NavLink to={`/map/${id}`} className={({ isActive }) => (isActive ? styles["active"] : "")}>Ціни в аптеках</NavLink>),
        (<Link to={`/product-details/${id}#instruction`}>Інструкція</Link>),
        (<Link to={`/product-details/${id}#characteristic`}>Характеристики</Link>),
        (<Link to={`/analugues/${id}`}>Аналоги</Link>),
        (<Link to={`/product-details/${id}#questions`}>Часті питання</Link>)
    ]

    const maxWidth = 610;
    const [displayCount, setDisplayCount] = useState(links.length);


    const updateComponentWidth = () => {
        const width = document.getElementById('productNav').offsetWidth;

        if (width < maxWidth) {
            setDisplayCount(Math.ceil((width / maxWidth) * links.length)-1)
        } else {
            setDisplayCount(links.length);
        }
    };


    useEffect(() => {

        updateComponentWidth();

        const handleResize = () => {
            updateComponentWidth();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="productNav" className={`${styles["product-nav"]} w-100 font-map-14`}>
            {links.slice(0, displayCount).map(a => a)}

            {links.length!==displayCount&&
            (<div class="btn-group">
                <button type="button" class="btn" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    ...
                </button>
                <ul class="dropdown-menu dropdown-menu-lg-end">
                {links.slice(displayCount, links.length).map(a => <li>{a}</li>)} 
                </ul>
            </div>)
}
        </div >
    );
}
