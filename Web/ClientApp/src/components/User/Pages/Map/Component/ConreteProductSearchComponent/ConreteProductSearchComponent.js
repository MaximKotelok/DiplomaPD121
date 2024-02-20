import { searchConcreteProduct } from '../../../../../../services/concreteProduct';
import React, { useState, useEffect } from 'react';

import styles from "./ConreteProductSearchComponent.module.css"
import searchIcon from "../../../../../../assets/images/header-icons/search-icon.svg"

const ConreteProductSearchComponent = ({className="", pharmacyId}) => {
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value == "") {
            setProducts([])
            return;

        }

        const response = await searchConcreteProduct(pharmacyId,value);

        if (Array.isArray(response.data)) {
            setProducts(response.data);
        } else {
            setProducts([]);
        }
    };

    return (
        <div className={`input-group ${styles["back-serach-bar"]} center ${className}`}>
        <button className={`${styles["social-btn"]}`} type="button" >
            <img src={searchIcon} width="28px" height="28px"  alt="My Icon" className="icon" />
        </button>
        <input type="text" className={`${styles["my-search-bar"]}`} placeholder="Пошук товарів тут..." aria-label="Example text with button addon" aria-describedby="button-addon1" />
    </div>
    );
};
export default ConreteProductSearchComponent;