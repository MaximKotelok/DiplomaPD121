import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, getCity } from '../utils/Location';
import { getFromServer } from '../utils/Queries';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../utils/Cookies"

const Map = (props) => {
    const [map, setMap] = useState(null);

    let defaultIcon = L.icon({
        iconUrl: '/images/icons/marker-icon.png',
        iconSize: [28, 40],
        iconAnchor: [14, 40]
    });
    let clickedIcon = L.icon({
        iconUrl: '/images/icons/marker-icon-selected.png',
        iconSize: [34, 45],
        iconAnchor: [17, 45]
    });

    let selectedMarker = null;

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
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(myMap);

        let city = getCookie("city");
        showLocation(city, myMap);

        setMap(myMap);

        setPharmacyOfTown(city, myMap);
    }, []);

    const setPharmacyOfTown = async (city, map) => {
        let pharmacy = (await getFromServer(`Pharmacy/GetListOfPharmacyInYourCity/${city}`)).data;

        pharmacy.forEach((element) => {
            L.marker([element.latitude, element.longitude], { icon: defaultIcon }).addTo(map)
                .openPopup()
                .on('mouseup', getCurrentPharmacy);
        });

    }

    const getCurrentPharmacy = async (e) => {
        var clickedMarker = e.target;

        let pharmacy = (await getFromServer(`Pharmacy/Coords/${clickedMarker._latlng.lat}/${clickedMarker._latlng.lng}`)).data;

        //SELECT JQUERRY PHARMACY IN LIST


        if (selectedMarker) {
            selectedMarker.setIcon(defaultIcon);
        }

        selectedMarker = clickedMarker;
        clickedMarker.setIcon(clickedIcon);
    }

    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
        </div>
    );
};
export default Map;