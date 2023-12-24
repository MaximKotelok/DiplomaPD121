import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, getCity } from '../utils/Location';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../utils/Cookies"

const Map = (props) => {
    const [map, setMap] = useState(null);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCity);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [])
   
    useEffect(() => {
        const myMap = L.map('map').setView([0, 0], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(myMap);

        let city = getCookie("city");
        showLocation(city, myMap);

        setMap(myMap);

    }, []);



    return (
        <div id="map" style={{ height: '400px' }}>
            {/* The map will be rendered here */}
        </div>
    );
};
export default Map;