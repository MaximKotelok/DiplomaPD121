import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, setupLocation } from '../../../../../../utils/Location';
import { getFromServer } from '../../../../../../utils/Queries';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../../../../utils/Cookies"
import ListPharmacies from "../ListPharmaciesComponent/ListPharmacies"
import './MapPharmacies.css';


const MapPharmacies = (props) => {
    const [map, setMap] = useState(null);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [townPharmacy, setTownPharmacy] = useState([]);
    const [mapMarkers, setMapMarkers] = useState({});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [city, setCity] = useState(getCookie("city"));


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


    useEffect(() => {
        setupLocation().then(() => {
            const myMap = L.map('map').setView([0, 0], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap);

            let city = getCookie("city");
            setCity(city);

            setMap(myMap);

        });
    }, []);

    useEffect(() => {
        if (city != null && map != null) {
            showLocation(city, map);
            setPharmacyOfTown(city, map);
        }
    }, [map])

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
        setTownPharmacy(pharmacy);
    }

    const getCurrentPharmacy = async (e) => {

        var clickedMarker = e.target;

        let pharmacy = (await getFromServer(`Pharmacy/Coords/${clickedMarker._latlng.lat}/${clickedMarker._latlng.lng}`)).data;
        if(pharmacy){                  
            setSelectedPharmacy(pharmacy);
            
            let elem = document.getElementById(`pharmacy${pharmacy.id}`)
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        }

        await setSelectedMarker((prevMarker) => {
            if (prevMarker) {
                prevMarker.setIcon(defaultIcon);
            }
            map.panTo(new L.LatLng(clickedMarker._latlng.lat, clickedMarker._latlng.lng));
            clickedMarker.setIcon(clickedIcon);
            return clickedMarker;
        });
    }

    const handleMapSelect = async (pharmacy) => {
        if (selectedMarker) {
            selectedMarker.setIcon(defaultIcon);
            setSelectedMarker(null); 
            map.setView(new L.LatLng(selectedMarker._latlng.lat, selectedMarker._latlng.lng));
        }
        setTimeout(() => {
            const newMarker = mapMarkers[pharmacy.id];
            map.setView(new L.LatLng(newMarker._latlng.lat, newMarker._latlng.lng));
            newMarker.setIcon(clickedIcon);
            setSelectedMarker(newMarker);
        }, 0);
        
    };


    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
            {city !== "" && townPharmacy != null ? (
                <ListPharmacies
                    city={city}
                    selectedPharmacy={selectedPharmacy}
                    townPharmacy={townPharmacy}
                    onPharmacyClick={pharmacy => {
                        if(pharmacy){
                            setSelectedPharmacy(pharmacy); 
                            let elem = document.getElementById(`pharmacy${pharmacy.id}`)
                            if (elem) {
                                elem.scrollIntoView({ behavior: "smooth" })
                            }                          
                        }
                    }}
                    onMapSelect={(pharmacy)=>{                              
                        if(pharmacy){                  
                            handleMapSelect(pharmacy)        
                            let elem = document.getElementById(`pharmacy${pharmacy.id}`)
                            if (elem) {
                                elem.scrollIntoView({ behavior: "smooth" })
                            }
                        }
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default MapPharmacies;