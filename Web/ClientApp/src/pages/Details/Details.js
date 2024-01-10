import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addToRecentlyViewedProduct } from '../../utils/SessionStorage';
import "./Details.css";

export const Details = ()=> {
    const { id } = useParams();
    addToRecentlyViewedProduct(id);

console.log(id);
    return (<div>{id}</div>);
}
