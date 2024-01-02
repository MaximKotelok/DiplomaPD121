import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, getCity } from '../../utils/Location';
import { getFromServer } from '../../utils/Queries';
import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from "../../utils/Cookies"
import ListPharmacies from "./ListPharmacies"

const Map = (props) => {
    const [map, setMap] = useState(null);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [mapMarkers, setMapMarkers] = useState({});
    const [selectedMarker, setSelectedMarker] = useState(null);

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

    //let selectedMarker = null;

    

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

   /* useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // Call the function to get city based on the position
                getCity(position)
                    .then(city => {
                        // Initialize the map and perform other actions
                        const myMap = L.map('map').setView([0, 0], 13);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        }).addTo(myMap);

                        // Use the city obtained from the first part
                        showLocation(city, myMap);

                        setMap(myMap);

                        setPharmacyOfTown(city, myMap);

                        // Set the cookie now that the city is available
                        setCookie("city", city);
                    })
                    .catch(error => console.error('Error getting city:', error));
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);*/

    const setPharmacyOfTown = async (city, map) => {
        let pharmacy = (await getFromServer(`Pharmacy/GetListOfPharmacyInYourCity/${city}`)).data;

        const markers = {};
        pharmacy.forEach((element) => {
            const marker = L.marker([element.latitude, element.longitude], { icon: defaultIcon }).addTo(map)
                .openPopup()
                .on('click', getCurrentPharmacy);

            markers[element.id] = marker;
        });
        setMapMarkers(markers);
    }

    const getCurrentPharmacy = async (e) => {

        var clickedMarker = e.target;

        let pharmacy = (await getFromServer(`Pharmacy/Coords/${clickedMarker._latlng.lat}/${clickedMarker._latlng.lng}`)).data;
        setSelectedPharmacy(pharmacy);

        await setSelectedMarker((prevMarker) => {
            if (prevMarker) {
                prevMarker.setIcon(defaultIcon);
            }
            clickedMarker.setIcon(clickedIcon);
            return clickedMarker;
        });
    }

    const handleMapSelect = async (pharmacy) => {
        if (selectedMarker) {
            selectedMarker.setIcon(defaultIcon);
        }
        const newMarker = mapMarkers[pharmacy.id];
        newMarker.setIcon(clickedIcon);
        //ТУТ МОЖЕ БУТИ ПРОБЛЕМА НО ПОКИ ЇЇ НЕМА
        setSelectedMarker(newMarker);
    };

    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
            <ListPharmacies
                city={getCookie("city")}
                selectedPharmacy={selectedPharmacy}
                onPharmacyClick={pharmacy => {
                    setSelectedPharmacy(pharmacy);
                }}
                onMapSelect={handleMapSelect}
            ></ListPharmacies>
        </div>
    );
};
export default Map;