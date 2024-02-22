import React, { useState, useEffect } from 'react';
import checked from "../../../assets/images/checked-checkbox.svg"
import unchecked from "../../../assets/images/unchecked-checkbox.svg"

import styles from "./ProductFilterItemComponent.module.css"
const ProductFilterItemComponent = ({ state, setState, name, count }) => {

    return (
        <div className='d-flex justify-content-between'>
            {
            state?
                <img className={`${styles["checkbox"]}`} src={checked} onClick={()=>setState(true)}/>
                :<img className={`${styles["checkbox"]}`} src={unchecked} onClick={()=>setState(false)}/>
            }
            <p className='text-left flex-grow-1'>
                {name}
            </p>

            <p>+{count}</p>
        </div>
    );
};

export default ProductFilterItemComponent;
