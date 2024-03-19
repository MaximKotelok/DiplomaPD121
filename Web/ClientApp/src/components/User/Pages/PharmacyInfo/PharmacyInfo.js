import React, { useEffect, useState } from "react";
import CategoryPathDetailsComponent from "../Details/Component/CategoryPathDetailsComponent/CategoryPathDetailsComponent";
import styles from "./PharmacyInfo.module.css";
import 'leaflet/dist/leaflet.css'
import { ReactComponent as Save } from "./Vector.svg";
import { useParams } from "react-router";
import { getPharmacyById } from "../../../../services/pharmacy";
import { StateInfos, Success } from "../../../../utils/Constants";
import { addMinutes, getCurrentTimeInUkraine, isPharmacyOpen } from "../../../../utils/Functions";
import { getCity } from "../../../../utils/Location";
import { getCityById } from "../../../../services/city";
import { Link } from "react-router-dom";
import L from 'leaflet';

const PharmacyInfo = (props) => {
  const {pharmacyId} = useParams();
  
  const [loading, setLoading] = useState(StateInfos.LOADING);
  const [pharmacy, setPharmacy] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [city, setCity] = useState(null);
  const [map, setMap] = useState(null);


    let icon = L.icon({
        iconUrl: '/images/icons/marker-icon-selected.png',
        iconSize: [28, 40],
        iconAnchor: [14, 40]
    });

  useEffect(()=>{
    init();
  }, []);

    useEffect(() => {
        if (loading != StateInfos.LOADED) 
            return
        
        const myMap = L.map('pharmacyMap').setView([pharmacy.latitude, pharmacy.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(myMap);

        L.marker([pharmacy.latitude, pharmacy.longitude], { icon: icon }).addTo(myMap)
            .openPopup()

        setMap(myMap);

    }, [loading]);
  
  async function init(){
    let res = await getPharmacyById(pharmacyId);
    let resCity = await getCityById(res.data.cityID);
    if(res.status == Success && resCity.status == Success) {
      setPharmacy({
        id: res.data.id, 
        title: res.data.pharmaCompany.title, 
        address: res.data.address, 
        openTime: res.data.openTime,
        closeTime: res.data.closeTime,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
      
      setCity(resCity.data);
      setLoading(StateInfos.LOADED);
      setIsOpen(isPharmacyOpen(res.data.openTime, res.data.closeTime));
    }
  }

  console.log(city);
  if(loading !== StateInfos.LOADED)
    return "Loading";
  return (
    <div>
      {/* <CategoryPathDetailsComponent data={product.pathToCategory} /> */}
      {/* <CategoryPathDetailsComponent /> */}
<p className={` ${styles["path-text"]} `}>Аптеки   |    Інформація про аптеку</p>
      <div className="row" style={{ marginBottom: "80px" }}>
        <div className="col-12 col-md-8">
          <h4 className={`${styles["title-pharnacy"]}`}>
            {pharmacy.title}
          </h4>
          <p className={`${styles["text-opus"]}`}>{isOpen?`Відкрито до ${pharmacy.closeTime}`:`Буде відкрито з ${pharmacy.openTime}`}</p>
          <p className={`${styles["text-opus"]}`}>
            {pharmacy.address}
          </p>
          <p className={`${styles["text-opus"]}`}>
            Очікуваний час підтвердження броні{" "}
            <span className={`${styles["oclock-style"]}`}>{isOpen?addMinutes(getCurrentTimeInUkraine(),15):addMinutes(pharmacy.openTime,15)}</span>
          </p>
          <div className={` d-flex `}>
            <Link 
              to={`/map/pharmacies/${pharmacy.id}`}
              className={`btn brn-form ${styles["btn-style"]} ${styles["btn-prosta"]} `}
            >
              Аптека у {city.nameCity}
            </Link>
            <button 
              className={`brn-form ${styles["btn-style"]} ${styles["btn-img"]} `}
            >
              <Save />{" "}
              <span style={{ marginLeft: "8px" }}>Зберегти в мої аптеки</span>
            </button>
          </div>
        </div>
            <div className="col-12 col-md-4">
                  <div id="pharmacyMap" style={{ height: '200px' }}></div>
            </div>
      </div>
    </div>
  );
};

export default PharmacyInfo;
