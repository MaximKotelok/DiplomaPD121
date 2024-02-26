import React, { useState, useEffect } from 'react';
import ProductFilterItemComponent from '../ProductFilterItemComponent/ProductFilterItemComponent';
import ProductFilterItemGroupComponent from '../ProductFilterItemGroupComponent/ProductFilterItemGroupComponent';

import styles from "./ProductFilterChoosenComponent.module.css";
const ProductFilterChoosenComponent = ({ name, remove }) => {
    
    return (<div className={`${styles["capsule"]}`}>{name} <i class={`${styles["cross-icon"]} bi bi-x`} onClick={remove}></i></div>)
};

export default ProductFilterChoosenComponent;
