﻿import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { showLocation, setupLocation } from "../../../../../../utils/Location";
import { getFromServer } from "../../../../../../utils/Queries";
import React, { useState, useEffect, useRef } from "react";
import { getCookie, setCookie } from "../../../../../../utils/Cookies";
import ListPharmacies from "../ListPharmaciesComponent/ListPharmacies";
import "./MapPharmacies.css";
import { getPharmacyCity } from "../../../../../../services/pharmacy";
import { useParams } from "react-router";
import { Success } from "../../../../../../utils/Constants";
import { redirect404 } from "../../../../../../utils/Functions";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../../../../assets/images/LouderAnimation/LouderCapsule.json";

const MapPharmacies = (props) => {
  const { pharmacyId } = useParams();
  const [init,setInit] = useState(false);

  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [townPharmacy, setTownPharmacy] = useState([]);
  const [mapMarkers, setMapMarkers] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [city, setCity] = useState(getCookie("city"));


  
  let defaultIcon = L.icon({
    iconUrl: "/images/icons/marker-icon.png",
    iconSize: [35, 40],
    iconAnchor: [14, 40],
  });
  let clickedIcon = L.icon({
    iconUrl: "/images/icons/marker-icon-selected.png",
    iconSize: [45, 50],
    iconAnchor: [17, 45],
  });

  useEffect(()=>{
    setInit(false);
    async function checkCity(){
       let res = await getPharmacyCity(pharmacyId);
       if(res.status === Success){
        setCookie("city", res.data);
        setCity(res.data);
       }else{
        redirect404();
       }
       setInit(true);
    }
    if(!pharmacyId){
      setInit(true);
    }
    else{
      checkCity();
    }
    
  },[pharmacyId]);

  useEffect(() => {
    if(init) {
    setupLocation().then(() => {
      const myMap = L.map("map").setView([0, 0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(myMap);

      setCity(getCookie("city"));

      setMap(myMap);
    });
  }
  }, [init]);

  useEffect(() => {
    if (city != null && map != null) {
      showLocation(city, map);
      setPharmacyOfTown(city, map, props.companyId);
    }
  }, [map]);

  const setPharmacyOfTown = async (city, map, companyId) => {
    let pharmacy;
    if (!companyId) {
      pharmacy = (
        await getFromServer(`Pharmacy/GetListOfPharmacyInYourCity/${city}`)
      ).data;
    } else {
      pharmacy = (
        await getFromServer(
          `Pharmacy/GetListOfPharmacyInYourCityByCompany/${city}/${companyId}`
        )
      ).data;
    }

    const markers = {};
    pharmacy.forEach((element) => {
      const marker = L.marker([element.latitude, element.longitude], {
        icon: defaultIcon,
      })
        .addTo(map)
        .openPopup()
        .on("click", getCurrentPharmacy);

      markers[element.id] = marker;
    });
    setMapMarkers(markers);
    setTownPharmacy(pharmacy);
  };

  const getCurrentPharmacy = async (e) => {
    var clickedMarker = e.target;

    let pharmacy = (
      await getFromServer(
        `Pharmacy/Coords/${clickedMarker._latlng.lat}/${clickedMarker._latlng.lng}`
      )
    ).data;
    if (pharmacy) {
      setSelectedPharmacy(pharmacy);

      let elem = document.getElementById(`pharmacy${pharmacy.id}`);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }

    await setSelectedMarker((prevMarker) => {
      if (prevMarker) {
        prevMarker.setIcon(defaultIcon);
      }
      map.setView(
        new L.LatLng(clickedMarker._latlng.lat, clickedMarker._latlng.lng),
        100
      );
      clickedMarker.setIcon(clickedIcon);
      return clickedMarker;
    });
  };

  const handleMapSelect = async (pharmacy) => {
    if (selectedMarker) {
      selectedMarker.setIcon(defaultIcon);
      setSelectedMarker(null);
      map.setView(
        new L.LatLng(selectedMarker._latlng.lat, selectedMarker._latlng.lng)
      );
    }
    setTimeout(() => {
      const newMarker = mapMarkers[pharmacy.id];
      map.setView(
        new L.LatLng(newMarker._latlng.lat, newMarker._latlng.lng),
        100
      );
      newMarker.setIcon(clickedIcon);
      setSelectedMarker(newMarker);
    }, 0);
  };

  return (
    // <div>
    //   <div id="map" style={{ height: "400px" }}></div>

    //   {city !== "" && townPharmacy != null ? (
    //     <ListPharmacies
    //       city={city}
    //       selectedPharmacy={selectedPharmacy}
    //       townPharmacy={townPharmacy}
    //       onPharmacyClick={(pharmacy) => {
    //         if (pharmacy) {
    //           setSelectedPharmacy(pharmacy);
    //           let elem = document.getElementById(`pharmacy${pharmacy.id}`);
    //           if (elem) {
    //             elem.scrollIntoView({ behavior: "smooth" });
    //           }
    //         }
    //       }}
    //       onMapSelect={(pharmacy) => {
    //         if (pharmacy) {
    //           handleMapSelect(pharmacy);
    //           let elem = document.getElementById(`pharmacy${pharmacy.id}`);
    //           if (elem) {
    //             elem.scrollIntoView({ behavior: "smooth" });
    //           }
    //         }
    //       }}
    //     />
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div id="container">
      <div id="map" class="map"></div>

      {city !== "" && townPharmacy != null ? (
        <ListPharmacies
          city={city}
          selectedPharmacy={selectedPharmacy}
          townPharmacy={townPharmacy}
          onPharmacyClick={(pharmacy) => {
            if (pharmacy) {
              setSelectedPharmacy(pharmacy);
              let elem = document.getElementById(`pharmacy${pharmacy.id}`);
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
              }
            }
          }}
          onMapSelect={(pharmacy) => {
            if (pharmacy) {
              handleMapSelect(pharmacy);
              let elem = document.getElementById(`pharmacy${pharmacy.id}`);
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
              }
            }
          }}
        />
      ) : (
        <div>
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
      )}
    </div>
  );
};
export default MapPharmacies;
