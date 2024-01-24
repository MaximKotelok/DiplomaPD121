import React, { useState } from 'react';
import "./SquareCardComponent.css"
import { Link } from 'react-router-dom';

const SquareCardComponent = ({ title, image, imageHeight, linkTo }) => {

    return (

        <Link to={linkTo} className="card-search-box">
            {image? <img src={image} height={imageHeight} />:
            <div className='d-flex align-items-center' style={{height: imageHeight+"px"}}>404</div>}
            {title && <p>{title}</p>}
        </Link>


    )

}


export default SquareCardComponent;
