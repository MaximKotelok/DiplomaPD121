import React, { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './FavoriteButton.css';
import { addFavouriteProduct, removeFavouriteProduct, getFavs } from '../../../services/favProducts';
import { toast } from "react-toastify";
import heart from "../../../assets/images/product-card/heart.svg"
import heartActive from "../../../assets/images/product-card/active-heart.svg"
const FavoriteButton = ({ isFavorite, setIsFavorite, id }) => {    
    
    async function handleClick() {
        let status = 401;
        if (!isFavorite)
            status = await addFavouriteProduct(id);
        else
            status = await removeFavouriteProduct(id);

        let favs = await getFavs();
        localStorage.setItem("favs", favs)

        if(status == 401){    
            toast.error("Помилка")
            
        }
        setIsFavorite(!isFavorite);
    }

  return isFavorite ? (
    <img
      src={heartActive}
      className={` ${styles["pos-absolute"]} ${styles["top-end-pos"]} favorite-icon`}
      onClick={handleClick}
    />
  ) : (
    <img
      src={heart}
      className={`${styles["pos-absolute"]} ${styles["top-end-pos"]}  favorite-icon`}
      onClick={handleClick}
    />
  );
};

export default FavoriteButton;