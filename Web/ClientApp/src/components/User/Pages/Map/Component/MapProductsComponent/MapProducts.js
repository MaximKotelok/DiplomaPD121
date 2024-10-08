﻿import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { showLocation, setupLocation } from "../../../../../../utils/Location";
import React, { useState, useEffect, useRef } from "react";
import { getCookie } from "../../../../../../utils/Cookies";
import ListProducts from "../ListProductsComponent/ListProducts";
import "./MapProducts.css";
import styles from "./ListProduct.module.css";
import { getProductById } from "../../../../../../services/product";
import {
  Coords,
  getListOfConcreteProductInYourCity,
} from "../../../../../../services/concreteProduct";
import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import ListProductItemComponent from "../ListProductItemComponent/ListProductItemComponent";
import useWindowSize from "../../../Profile/UseWindowSize";
import CarouselListWithoutNavsComponent from "../../../../Common/CarouselListWithoutNavsComponent/CarouselListWithoutNavsComponent";

const MapProducts = (props) => {
  const [map, setMap] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [townProducts, setTownProducts] = useState(null);
  const [mapMarkers, setMapMarkers] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [city, setCity] = useState(getCookie("city"));
  const [product, setProduct] = useState(null);
  const { width } = useWindowSize();
  const isIpad = width <= 1200 && width >=768;

  const selectedProductPrice = useRef(null);

  async function loadProduct() {
    let product = await getProductById(props.productId);
    if (product.data.product) setProduct(product.data.product);
    else setProduct(product.data);
  }

  useEffect(() => {
    loadProduct();

    setupLocation().then(() => {
      const myMap = L.map("map").setView([0, 0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(myMap);

      setCity(city);

      setMap(myMap);
    });
  }, []);

  useEffect(() => {
    if (city != null && map != null) {
      showLocation(city, map);
      setProductOfTown(city, map);
    }
  }, [map]);

  const setProductOfTown = async (city, map) => {
    let products = (
      await getListOfConcreteProductInYourCity(city, props.productId)
    ).data;

    const markers = {};
    products.forEach((element) => {
      let defaultIcon = L.divIcon({
        className: "map-icon-container",
        html: `<div class="map-default-marker"><p class="map-market-text">${Number(
          element.price
        ).toFixed(2)}</p></div>`,
        iconSize: [30, 30],
      });

      const marker = L.marker(
        [element.pharmacy.latitude, element.pharmacy.longitude],
        { icon: defaultIcon }
      )
        .addTo(map)
        .openPopup()
        .on("click", getCurrentProduct);

      markers[element.id] = marker;
    });
    setMapMarkers(markers);
    setTownProducts(products);
  };

  const getCurrentProduct = async (e) => {
    var clickedMarker = e.target;

    

    let product = (
      await Coords(
        clickedMarker._latlng.lat,
        clickedMarker._latlng.lng,
        props.productId
      )
    ).data;


    if (product) {
      setSelectedProduct(product);

      let elem = document.getElementById(`product${product.id}`);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }

    let defaultIcon = L.divIcon({
      className: "map-icon-container",
      html: `<div class="map-default-marker"><p class="map-market-text">${Number(
        selectedProductPrice.current
      ).toFixed(2)}</p></div>`,
      iconSize: [30, 30],
    });

    var clickedIcon = L.divIcon({
      className: "map-icon-container",
      html: `<div class="map-selected-marker"><p class="map-market-text">${Number(
        product.price
      ).toFixed(2)}</p></div>`,
      iconSize: [30, 30],
    });

    setSelectedMarker((prevMarker) => {
      if (prevMarker) {
        prevMarker.setIcon(defaultIcon);
      }
      const selected = new L.LatLng(
        clickedMarker._latlng.lat,
        clickedMarker._latlng.lng
      );

      map.setView(selected, 100);
      clickedMarker.setIcon(clickedIcon);

      const markerElement = clickedMarker._icon;

      if (markerElement) {
        markerElement.style.zIndex = "999";
      }

      return clickedMarker;
    });
    selectedProductPrice.current = product.price;
    setSelectedProduct(product);
  };

  const handleMapSelect = async (product) => {
    const newMarker = mapMarkers[product.id];

    var clickedIcon = L.divIcon({
      className: "map-icon-container selected",
      html: `<div class="map-selected-marker"><p class="map-market-text">${Number(
        product.price
      ).toFixed(2)}</p></div>`,
      iconSize: [30, 30],
    });

    if (selectedMarker) {
      let defaultIcon = L.divIcon({
        className: "map-icon-container",
        html: `<div class="map-default-marker"><p class="map-market-text">${Number(
          selectedProductPrice.current
        ).toFixed(2)}</p></div>`,
        iconSize: [30, 30],
      });
      selectedMarker.setIcon(defaultIcon);
      setSelectedMarker(null); // Clear selected marker to avoid conflicts
      map.setView(
        new L.LatLng(selectedMarker._latlng.lat, selectedMarker._latlng.lng)
      );
    }

    // Set timeout to ensure the icon is updated before changing the view
    setTimeout(() => {
      map.setView(
        new L.LatLng(newMarker._latlng.lat, newMarker._latlng.lng),
        100
      );
      newMarker.setIcon(clickedIcon);
      setSelectedMarker(newMarker);
    }, 0);
    selectedProductPrice.current = product.price;
  };

  const isValid = city && townProducts && product;
  return (
    <div>
      {/* <div id="map" style={{ height: "400px" }}></div> */}

      <div className="map-left  p-3">
        <div className="mx-3">
          {isValid && (
            <div>
              <p className={styles["product-title"]}>
                {product.title} {product.shortDescription} ціна у {city}
              </p>
              <NavigationDetailsComponent id={product.id} />
              <p className={`${styles["found-in"]}`}>
                Знайдено у {townProducts.length} аптеках
              </p>
            </div>
          )}


          <div id="container">
            <div id="map" style={{ height: "240px" }}></div>

            {isValid && (isIpad?
            (<CarouselListWithoutNavsComponent 
              mdDisplayCount={1.2} xlDisplayCount={1.5}
            >
               {townProducts.map((product, index) => (
                <ListProductItemComponent
                className="me-2"
                  key={index}
                  pharmacyId={product.pharmacy.id}
                  id={product.id}
                  isSelected={
                    selectedProduct && selectedProduct.id == product.id
                  }
                  price={product.price}
                  lon={product.pharmacy.longitude}
                  lat={product.pharmacy.latitude}
                  title={product.pharmacy.pharmaCompany.title}
                  productTitle={`${product.product.title} ${product.product.shortDescription}`}
                  address={product.pharmacy.address}
                  manufacturer={product.product.manufacturer.name}
                  timeClosed={product.pharmacy.closeTime}
                  timeOpen={product.pharmacy.openTime}
                  onClick={() => {
                    //   onProductClick(product);
                    setSelectedProduct(product);
                    if (handleMapSelect) {
                      handleMapSelect(product);
                    }
                  }}
                />
              ))}
              </CarouselListWithoutNavsComponent>
              )
            :
              townProducts.map((product, index) => (
                <ListProductItemComponent
                  key={index}
                  pharmacyId={product.pharmacy.id}
                  id={product.id}
                  isSelected={
                    selectedProduct && selectedProduct.id == product.id
                  }
                  price={product.price}
                  lon={product.pharmacy.longitude}
                  lat={product.pharmacy.latitude}
                  title={product.pharmacy.pharmaCompany.title}
                  productTitle={`${product.product.title} ${product.product.shortDescription}`}
                  address={product.pharmacy.address}
                  manufacturer={product.product.manufacturer.name}
                  timeClosed={product.pharmacy.closeTime}
                  timeOpen={product.pharmacy.openTime}
                  onClick={() => {
                    //   onProductClick(product);
                    setSelectedProduct(product);
                    if (handleMapSelect) {
                      handleMapSelect(product);
                    }
                  }}
                />
              )))}
          </div>


          
        </div>
      </div>
    </div>
  );
};
export default MapProducts;
