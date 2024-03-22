import React, { useState } from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './FavoriteProductButton.css';
import { addFavouriteProduct, removeFavouriteProduct, getFavsProducts } from '../../../services/favProducts';
import { toast } from "react-toastify";
import heart from "../../../assets/images/product-card/heart.svg"
import heartActive from "../../../assets/images/product-card/active-heart.svg"
import { favouriteProducts } from '../../../utils/Constants';
import styles from "../../User/Pages/Category/Component/CategoryWithProductsComponent/CategoryWithSubCategoriesComponent.module.css";
const FavoriteProductButton = ({ isFavorite, setIsFavorite, id, style }) => {    
    
    async function handleClick() {
        let status = 401;
        if (!isFavorite)
            status = await addFavouriteProduct(id);
        else
            status = await removeFavouriteProduct(id);

        let favs = await getFavsProducts();
        localStorage.setItem(favouriteProducts, favs)

        if(status == 401){    
            toast.error("Помилка")
            
        }
        setIsFavorite(!isFavorite);
    }

    return (isFavorite ?
        <img src={heartActive} style={style} className="position-absolute favorite-icon" onClick={handleClick}/>:
        <img src={heart} style={style} className="position-absolute favorite-icon" onClick={handleClick}/>
    )
};

export default FavoriteProductButton;