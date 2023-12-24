import React, { useEffect } from 'react';
import ProductForm from './ProductForm';
import Map from './Map';
import { getCity } from '../utils/Location';

export function Home() {
    return (
        <div>
            {/*<ProductForm></ProductForm>*/}
            <Map></Map>
        </div>
    );
}
