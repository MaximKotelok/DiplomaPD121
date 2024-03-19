import React, { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "./FavoriteButton.css";
import styles from "../../User/Pages/Category/Component/CategoryWithProductsComponent/CategoryWithSubCategoriesComponent.module.css";

import {
  addFavouriteProduct,
  removeFavouriteProduct,
} from "../../../services/favProducts";
import { toast } from "react-toastify";
import heart from "../../../assets/images/product-card/heart.svg";
import heartActive from "../../../assets/images/product-card/active-heart.svg";
const FavoriteButton = ({ isFavorite, setIsFavorite, id }) => {
  async function handleClick() {
    let status = 401;
    if (!isFavorite) status = await addFavouriteProduct(id);
    else status = await removeFavouriteProduct(id);

    if (status == 401) {
      toast.error("Помилка");
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
