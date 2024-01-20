import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addToRecentlyViewedProduct } from '../../../utils/SessionStorage';
import "./Details.css";
import { Link } from 'react-router-dom';
export const Details = ()=> {
    const { id } = useParams();
    addToRecentlyViewedProduct(id);

console.log(id);
    return (<div>
        <Link to={`/map/${id}`}>
            Порівняння цін
        </Link>
    </div>);
}
