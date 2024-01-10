import React from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton.js';
import { ApiPath } from '../../utils/Constants.js';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './ProductCardComponent.css';

const ProductCardComponent =
    ({
        id,
        imageUrl,
        title = "...",
        minPrice = 0.0,
        isFavorite = false,
        countOfPharmacies = 0,
        manufacturer = "...",
        description = "..."
    }) => {
        function minimizeText(text, maxSymbols) {
            if (text) {
                if (text.length <= maxSymbols) {
                    return text;
                }
                return text.slice(0, maxSymbols) + '...';
            }
            return "";
        }



        return (
            <div className="border m-1 product-card">
                <div className='position-relative'>
                    <FavoriteButton isFavorite={isFavorite}></FavoriteButton>
                    <img
                        width={183}
                        height={170}
                        src={`${ApiPath}${imageUrl}`}
                        className='product-image'
                        alt={title} />
                </div>
                <div className='product-info'>

                    <p className='product-title'>{minimizeText(title, 20)}</p>
                    <p className='product-description'>{minimizeText(description, 57)}</p>
                </div>
                <p className='product-manufacturer'>{minimizeText(manufacturer, 26)}</p>
                <p className='count-of-pharmacies'>
                    <i className="bi bi-check2 check-in-count-of-pharmacies"></i>
                    {countOfPharmacies} аптек
                </p>
                <p className='product-price'>від <span className='product-price-bold'>{minPrice}</span> грн</p>
                <a href="#" className="btn w-100 product-button" >
                    Ціни в аптеках
                </a>


            </div>
        );
    };

export default ProductCardComponent;
