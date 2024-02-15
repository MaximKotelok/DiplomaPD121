import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, setupLocation } from '../../../../../../utils/Location';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../../../../utils/Cookies"
import ListProducts from "../ListProductsComponent/ListProducts"
import './MapProducts.css';
import { getProductById } from '../../../../../../services/product';
import { Coords, getListOfConcreteProductInYourCity } from '../../../../../../services/concreteProduct';

const MapProducts = (props) => {
    const [map, setMap] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [townProducts, setTownProducts] = useState(null);
    const [mapMarkers, setMapMarkers] = useState({});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [city, setCity] = useState(getCookie("city"));
    const [product, setProduct] = useState(null);

    let selectedProductPrice = null;

    async function loadProduct() {
        let product = (await getProductById(props.productId))
        if (product.data.product)
            setProduct(product.data.product);
        else
            setProduct(product.data);
    };

    useEffect(() => {
        loadProduct();

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
            setProductOfTown(city, map);
        }

    }, [map])


    const setProductOfTown = async (city, map) => {

        let products = (await getListOfConcreteProductInYourCity(city, props.productId)).data;

        const markers = {};
        products.forEach((element) => {
            let defaultIcon = L.divIcon({
                className: 'map-icon-container',
                html: `<div class="map-default-marker"><p>${Number(element.price).toFixed(2)}</p></div>`,
                iconSize: [30, 30],
            });

            const marker = L.marker([element.pharmacy.latitude, element.pharmacy.longitude], { icon: defaultIcon }).addTo(map)
                .openPopup()
                .on('click', getCurrentProduct);

            markers[element.id] = marker;
        });
        setMapMarkers(markers);
        setTownProducts(products);

    }

    const getCurrentProduct = async (e) => {
        var clickedMarker = e.target;

        let product = (await Coords(clickedMarker._latlng.lat, clickedMarker._latlng.lng, props.productId)).data;


        if (selectedProductPrice == null)
            selectedProductPrice = product.price;

        let defaultIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-default-marker"><p>${Number(selectedProductPrice).toFixed(2)}</p></div>`,
            iconSize: [30, 30],
        });

        var clickedIcon = L.divIcon({
            className: 'map-icon-container',
            html: `<div class="map-selected-marker"><p>${Number(product.price).toFixed(2)}</p></div>`,
            iconSize: [30, 30],
        });



        setSelectedMarker((prevMarker) => {
            if (prevMarker) {
                prevMarker.setIcon(defaultIcon);
            }
            const selected = new L.LatLng(clickedMarker._latlng.lat, clickedMarker._latlng.lng);

            map.panTo(selected);
            clickedMarker.setIcon(clickedIcon);

            const markerElement = clickedMarker._icon;

            if (markerElement) {
                markerElement.style.zIndex = '999';
            }


            return clickedMarker;
        });
        setSelectedProduct(product);
        selectedProductPrice = product.price;
    }

    const handleMapSelect = async (product) => {
        const newMarker = mapMarkers[product.id];
        var clickedIcon = L.divIcon({
            className: 'map-icon-container selected',
            html: `<div class="map-selected-marker"><p>${Number(product.price).toFixed(2)}</p></div>`,
            iconSize: [30, 30],        

        });


        if (selectedMarker) {
            let defaultIcon = L.divIcon({
                className: 'map-icon-container',
                html: `<div class="map-default-marker"><p>${Number(selectedProduct.price).toFixed(2)}</p></div>`,
                iconSize: [30, 30],
            });
            selectedMarker.setIcon(defaultIcon);
            setSelectedMarker(null);  // Clear selected marker to avoid conflicts
            map.setView(new L.LatLng(selectedMarker._latlng.lat, selectedMarker._latlng.lng));
        }

        // Set timeout to ensure the icon is updated before changing the view
        setTimeout(() => {
            map.setView(new L.LatLng(newMarker._latlng.lat, newMarker._latlng.lng));
            newMarker.setIcon(clickedIcon);
            setSelectedMarker(newMarker);
        }, 0);
    };

    return (
        <div>


            <div id="map" style={{ height: '400px' }}></div>
            {city !== "" && townProducts != null && product != null ? (
                <ListProducts
                    product={product}
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