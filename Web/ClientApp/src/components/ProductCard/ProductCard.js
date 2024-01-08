import React from 'react';
import { Check2, Heart, HeartFill } from 'react-bootstrap-icons';
import FavoriteButton  from '../FavoriteButton/FavoriteButton.js';

import 'bootstrap/dist/css/bootstrap.css';
import './ProductCard.css';

const ProductCard =
    ({
        title = "...",
        minPrice = 0.0,
        imageUrl = "https://elements-cover-images-0.imgix.net/eae8629b-05a5-4956-a1d8-cb9f310ca850?auto=compress%2Cformat&w=866&fit=max&s=b89cf910fa6a03955819e9b2b8210108",
        isFavorite = false,
        countOfPharmacies = 0,
        manufacturer = "...",
        description = "..."
    }) => {
        function minimizeText(text, maxSymbols) {
            if (text.length <= maxSymbols)
                return text;

            return text.slice(0, maxSymbols) + '...';
        }


        return (
            <div className="border m-1 product-card">
                <div className='position-relative'>
                    <FavoriteButton isFavorite={isFavorite}></FavoriteButton>
                    
                    <img
                        width={183}
                        height={170}
                        src={imageUrl}
                        className='product-image'
                        alt={title} />
                </div>
                <p className='product-title'>{title}</p>
                <p className='product-description'>{minimizeText(description, 57)}</p>
                <p className='product-manufacturer'>{minimizeText(manufacturer, 26)}</p>
                <p className='count-of-pharmacies'>
                    <Check2 className="check-in-count-of-pharmacies" />{countOfPharmacies} аптек
                </p>
                <p className='product-price'>від <span className='product-price-bold'>{minPrice}</span> грн</p>
                <a href="#" className="btn w-100 product-button" >
                    Ціни в аптеках
                </a>


            </div>
        );
    };

export default ProductCard;
