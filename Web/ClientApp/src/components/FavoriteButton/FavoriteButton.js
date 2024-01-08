import React, { useState } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.css';
import './FavoriteButton.css';

const FavoriteButton = ({isFavorite}) => {
        const [favoriteState, setFavoriteState] = useState(isFavorite);

    function handleClick(){
        console.log("a")
        setFavoriteState(!favoriteState);
    }

        return (
            favoriteState?
        <HeartFill onClick={handleClick} className="position-absolute top-0 end-0 favorite-icon" />:
        <Heart onClick={handleClick} className="position-absolute top-0 end-0 favorite-icon" />)
    };

export default FavoriteButton;
