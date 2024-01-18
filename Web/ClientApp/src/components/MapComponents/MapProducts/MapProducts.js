import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, setupLocation } from '../../../utils/Location';
import { getFromServer } from '../../../utils/Queries';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../utils/Cookies"
import ListProducts from "../ListProducts/ListProducts"
import './MapProducts.css';

const MapProducts = (props) => {
    const [map, setMap] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [townProducts, setTownProducts] = useState(null);
    const [mapMarkers, setMapMarkers] = useState({});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [city, setCity] = useState(getCookie("city"));

    let selectedProductPrice = null;


    useEffect(() => {
        setupLocation().then(() => {
            const myMap = L.map('map').setView([0, 0], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap);

            let city = getCookie("city");
            setCity(getCookie("city"));

            setMap(myMap);

            showLocation(city, myMap);
            setProductOfTown(city, myMap);
        });
    }, []);


    const setProductOfTown = async (city, map) => {
        let products = (await getFromServer(`ConcreteProduct/GetListOfConcreteProductInYourCity/${city}/${props.productId}`)).data;

        const markers = {};
        products.forEach((element) => {
            let defaultIcon = L.divIcon({
                className: 'map-icon-container',
                html: `<div class="map-default-marker"><p>${element.price}</p></div>`,
                iconSize: [30, 30],
            });

            const marker = L.marker([element.pharmacy.latitude, element.pharmacy.longitude], { icon: defaultIcon }).addTo(map)
                .openPopup()
                .on('click', getCurrentProduct);

            markers[element.id] = marker;
        });
        setMapMarkers(markers);
        setTownProducts(products)

    }

    const getCurrentProduct = async (e) => {
        var clickedMarker = e.target;

        let product = (await getFromServer(`ConcreteProduct/Coords/${clickedMarker._latlng.lat}/${clickedMarker._latlng.lng}/${props.productId}`)).data;


        if (selectedProductPrice == null)
            selectedProductPrice = product.price;

        let defaultIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-default-marker"><p>${selectedProductPrice}</p></div>`,
            iconSize: [30, 30],
        });
       
        var clickedIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-selected-marker"><p>${product.price}</p></div>`,
            iconSize: [30, 30],
        });



        await setSelectedMarker((prevMarker) => {
            if (prevMarker) {
                prevMarker.setIcon(defaultIcon);
            }
            clickedMarker.setIcon(clickedIcon);
            return clickedMarker;
        });
        setSelectedProduct(product);
        selectedProductPrice = product.price;
    }

    const handleMapSelect = async (product) => {

        let defaultIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-default-marker"><p>${selectedProduct.price}</p></div>`,
            iconSize: [30, 30],
        });
        var clickedIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-selected-marker"><p>${product.price}</p></div>`,
            iconSize: [30, 30],
        });


        if (selectedMarker) {
            selectedMarker.setIcon(defaultIcon);
        }
        const newMarker = mapMarkers[product.id];
        newMarker.setIcon(clickedIcon);
        setSelectedMarker(newMarker);
    };


    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
            {city !== "" && townProducts != null ? (
                <ListProducts
                    city={city}
                    selectedProduct={selectedProduct}
                    townProducts={townProducts}
                    onProductClick={pharmacy => {
                        setSelectedProduct(pharmacy);
                    }}
                    onMapSelect={handleMapSelect}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default MapProducts;