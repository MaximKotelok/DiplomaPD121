import React, { useEffect } from 'react';
import ProductForm from './ProductForm';
import Map from './MapPage/Map';
import { getCity } from '../utils/Location';
import { getCookie } from "../utils/Cookies"

export function Home() {

    (async () => {

        if (getCookie("city") == "") {
            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition(getCity);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
    })();

    return (
        <div>
            {/*<ProductForm></ProductForm>*/}
            <Map></Map>
        </div>
    );
}
