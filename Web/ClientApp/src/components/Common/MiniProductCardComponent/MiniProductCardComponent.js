import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './MiniProductCardComponent.css';
import { Link } from 'react-router-dom';

import React, {useEffect,useState} from 'react';
import FavoriteButton from '../../Common/FavoriteButtonComponent/FavoriteButton.js'
import { ApiPath } from '../../../utils/Constants.js';
import CustomImgComponent from '../CustomImgComponent/CustomImgComponent.js';

const MiniProductCardComponent =
    ({
        id = 0,
        imageUrl = "data:image/png;base64,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",
        title = "...",
        description = "...",
        minPrice = 0.0,
        isFavorite
    }) => {
        const [isFavoriteState, setIsFavoriteState] = useState(false);
        useEffect(()=>{
            if(id)
                setIsFavoriteState(isFavorite(id));
        },[id])
        function minimizeText(text, maxSymbols) {
            if (text) {
                if (text.length <= maxSymbols) {
                    return text;
                }
                return text.slice(0, maxSymbols) + '...';
            }
            return "";
        }

        if (imageUrl && imageUrl[0] == '\\' || imageUrl[0] == '/')
            imageUrl = `${ApiPath}${imageUrl}`;

        return (
            <div className="m-1 product-card">
                <div className='position-relative'>
                    <FavoriteButton id={id} isFavorite={isFavoriteState} setIsFavorite={setIsFavoriteState}></FavoriteButton>
                    <Link to={`/product-details/${id}`} className='text-decoration-none'>
                        <CustomImgComponent 
                        src={imageUrl} 
                        defaultSrc="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                        style={{width:"183px", height:"170px"}}
                        className='product-image'
                        alt={title}
                        />
                    </Link>
                </div>
                <div className='product-info'>
                    <Link to={`/product-details/${id}`} className='text-decoration-none'>
                        <p className='product-title'>{title&&minimizeText(title, 20)}</p>
                        <p className='product-description'>{description&&minimizeText(description, 57)}</p>
                    </Link>
                </div>
                <p className='product-price'>від <span className='product-price-bold'>{minPrice&&minPrice}</span> грн</p>
                
            </div>
        );
    };

export default MiniProductCardComponent;
