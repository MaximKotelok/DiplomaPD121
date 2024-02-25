import React, { useState } from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './FavoriteButton.css';
import { addFavouriteProduct, removeFavouriteProduct } from '../../../services/favProducts';
import { toast } from "react-toastify";

const FavoriteButton = ({ isFavorite, setIsFavorite, id }) => {    
    
    async function handleClick() {
        let status = 401;
        if (!isFavorite)
            status = await addFavouriteProduct(id);
        else
            status = await removeFavouriteProduct(id);

        if(status == 401){    
            toast.error("Помилка")
            
        }
        setIsFavorite(!isFavorite);
    }

    return (isFavorite ?
        <i className="bi bi-heart-fill position-absolute top-0 end-0 favorite-icon" onClick={handleClick}></i> :
        <i className="bi bi-heart position-absolute top-0 end-0 favorite-icon" onClick={handleClick}></i>
    )
};

export default FavoriteButton;
