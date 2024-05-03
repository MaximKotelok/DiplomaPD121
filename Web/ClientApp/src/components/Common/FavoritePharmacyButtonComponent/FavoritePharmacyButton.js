import React, { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "./FavoritePharmacyButton.css";
import {
  addFavouritePharmacy,
  removeFavouritePharmacy,
  getFavsPharmacies,
} from "../../../services/favPharmacies";
import { toast } from "react-toastify";
import { ReactComponent as Save } from "./Save.svg";
import { ReactComponent as Saved } from "./Saved.svg";
import heart from "../../../assets/images/product-card/heart.svg";
import heartActive from "../../../assets/images/product-card/active-heart.svg";
import { FavouritePharmacies } from "../../../utils/Constants";

const FavoritePharmacyButton = ({ className,isFavorite, setIsFavorite, id, style }) => {
  async function handleClick() {
    let status = 401;
    if (!isFavorite) {
      status = await addFavouritePharmacy(id);
    } else {
      status = await removeFavouritePharmacy(id);
    }

    let favs = await getFavsPharmacies();
    localStorage.setItem(FavouritePharmacies, favs);

    if (status == 401) {
      toast.error("Помилка");
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <button
      style={style}
      className={`brn-form btn-style btn-img ${`${className}`} `}
      onClick={handleClick}
    >
      {isFavorite ? <Saved /> : <Save />}{" "}
      <span>
        {isFavorite ? "Видалити з юлюблених" : "Зберегти в мої аптеки"}
      </span>
    </button>
  );
};

export default FavoritePharmacyButton;
