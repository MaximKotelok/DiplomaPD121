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
import { getCookie } from "../../../../utils/Cookies";
import { ReactComponent as Geo } from "../../../../assets/images/geo.svg"
import { isFavoritePharmacy } from "../../../../utils/Functions"
import  FavoritePharmacyButton from "../../../Common/FavoritePharmacyButtonComponent/FavoritePharmacyButton"

const PharmacyInfo = (props) => {
  const {pharmacyId} = useParams();
  
  const [loading, setLoading] = useState(StateInfos.LOADING);
  const [pharmacy, setPharmacy] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [city, setCity] = useState(null);
  const [map, setMap] = useState(null);
  const [isFavoriteState, setIsFavoriteState] = useState(false);

   
    let icon = L.icon({
        iconUrl: '/images/icons/marker-icon-selected.png',
        iconSize: [28, 40],
        iconAnchor: [14, 40]
    });

  useEffect(()=>{
    init();
  }, []);

    useEffect(() => {
        if (pharmacy)
            setIsFavoriteState(isFavoritePharmacy(pharmacy.id));
    }, [pharmacy])

    useEffect(() => {
        if (loading === StateInfos.LOADED) 
        {

            const myMap = L.map('pharmacyMap').setView([pharmacy.latitude, pharmacy.longitude], 100);
              
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(myMap);

            L.marker([pharmacy.latitude, pharmacy.longitude], { icon: icon }).addTo(myMap)
                .openPopup()
            
                setMap(myMap);
        }

    }, [loading]);
  
  async function init(){
    let res = await getPharmacyById(pharmacyId);
    let resCity = await getCityById(res.data.cityID);
    if(res.status == Success && resCity.status == Success) {
      setPharmacy({
        id: res.data.id, 
        title: res.data.pharmaCompany.title, 
        pharmaCompanyId: res.data.pharmaCompany.id, 
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

    function changeFavoriteState(state) {
        setIsFavoriteState(state)
    }

  console.log(city);
  if(loading !== StateInfos.LOADED)
    return "Loading";
  return (
    <div>
      {/* <CategoryPathDetailsComponent data={product.pathToCategory} /> */}
      {/* <CategoryPathDetailsComponent /> */}
<p className={` ${styles["path-text"]} `}>Аптеки   |    Інформація про аптеку</p>
      <div className={`row`} style={{ marginBottom: "80px" }}>
        <div className={`col-12 col-md-8 ${styles["pharmacy-info-container"]}`}>
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
              to={`/map/pharmacies/${pharmacy.id}/${pharmacy.pharmaCompanyId}`}
              className={`btn brn-form ${styles["btn-style"]} ${styles["btn-prosta"]} `}
            >
              Аптеки {pharmacy.title} у місті {getCookie("city")}
            </Link>
            <FavoritePharmacyButton id={pharmacyId} isFavorite={isFavoriteState} setIsFavorite={changeFavoriteState} />    
          </div>
        </div>
            <div className="col-12 col-md-4">
              <div className={`${styles["map-container"]}`}>
                  <button onClick={()=>{
                        const mapsUrl = `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}&z=15&t=m`;
                        window.open(mapsUrl, '_blank');                    
                  }} className={`btn ${styles["geo"]} my-3`}>Маршрут <Geo className="geo-icon"/></button>
                  <div id="pharmacyMap" style={{ height: '200px' }}></div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default PharmacyInfo;
