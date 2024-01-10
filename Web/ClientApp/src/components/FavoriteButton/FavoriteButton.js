import React, { useState } from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './FavoriteButton.css';

const FavoriteButton = ({isFavorite}) => {
        const [favoriteState, setFavoriteState] = useState(isFavorite);

    function handleClick(){
        console.log("a")
        setFavoriteState(!favoriteState);
    }
        
         return (favoriteState?
            <i className="bi bi-heart position-absolute top-0 end-0 favorite-icon" onClick={handleClick}></i>:
            <i className="bi bi-heart-fill position-absolute top-0 end-0 favorite-icon" onClick={handleClick}></i>
         )
    };

export default FavoriteButton;
