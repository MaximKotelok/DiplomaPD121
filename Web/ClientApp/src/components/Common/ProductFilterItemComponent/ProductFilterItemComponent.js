import React, { useState, useEffect } from 'react';

import styles from "./ProductFilterItemComponent.module.css"
const ProductFilterItemComponent = ({ state, setState, name, count }) => {

    return (
        <div className={`d-flex justify-content-between pt-2 pb-0`}>
            <label className={`${styles["orange-checkbox-container"]}`}>{name}
                <input type="checkbox" checked={state} onChange={e=>setState(e.target.value)}/>
                <span className={`${styles["checkmark"]}`}></span>
                {/* <p>+{count}</p> */}
            </label>
            {/* {
            state?
                <img className={`${styles["checkbox"]}`} src={checked} onClick={()=>setState(true)}/>
                :<img className={`${styles["checkbox"]}`} src={unchecked} onClick={()=>setState(false)}/>
            }
            <p className='text-left flex-grow-1'>
                {name}
            </p> */}

        </div>
        
    );
};

export default ProductFilterItemComponent;
