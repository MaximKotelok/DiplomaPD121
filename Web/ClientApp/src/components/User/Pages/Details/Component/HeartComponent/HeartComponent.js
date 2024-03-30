import React, { useEffect, useState } from "react";
import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import { BtnRadioSelectedProduct } from "../../../../../Common/BtnRadioSelectedProductComponent/BtnRadioSelectedProduct";
import { AdditionalDivRadio } from "../AdditionalComponent/AdditionalDivRadio";
import { ReactComponent as Heart } from "../../../../../../assets/images/details/heart.svg";
import { addFavouriteProduct, getFavsProducts, removeFavouriteProduct } from "../../../../../../services/favProducts";
import { FavouriteProducts } from "../../../../../../utils/Constants";
import { toast } from "react-toastify";

import heartEmpty from "../../../../../../assets/images/details-favorite-button/favorite-empty.svg"
import heartHover from "../../../../../../assets/images/details-favorite-button/favorite-hover.svg"
import heartFill from "../../../../../../assets/images/details-favorite-button/favorite-fill.svg"
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";

const HeartComponent = ({ isFavorite, setIsFavorite, id, style, className }) => {
    const [isHover, setHover] = useState(false);

    async function handleClick() {
        let status = 401;
        if (!isFavorite)
            status = await addFavouriteProduct(id);
        else
            status = await removeFavouriteProduct(id);

        let favs = await getFavsProducts();
        localStorage.setItem(FavouriteProducts, favs)

        if (status == 401) {
            toast.error("Помилка")

        }
        setIsFavorite(!isFavorite);
    }
    
    return (isFavorite ?
        <img src={heartFill} style={style} className={`${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick} /> :
            (isHover ?
                <img src={heartHover} style={style} className={`${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick} /> :
                <img src={heartEmpty} style={style} className={`${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick} />
        )
    )
};

export default HeartComponent;