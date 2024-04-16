import "react-quill/dist/quill.snow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  GetPharmacist,
  getPharmacyById,
  upsertPharmacist,
  upsertPharmacy,
} from "../../../../../../services/pharmacy";
import { getAllPharmaCompanies } from "../../../../../../services/pharmaCompany";
import { getAllCities } from "../../../../../../services/city";
import {
  StateInfos,
  Success,
  LayoutProviderValues,
} from "../../../../../../utils/Constants";

import CustomSelectComponent from "../../../../../../components/Common/CustomSelectComponent/CustomSelectComponent";

import { ReactComponent as Palka } from "./Palka.svg";
import styles from "./UpsertPharmacyComponent.module.css";

import LayoutContext from "../../../../../../layouts/LayoutContext";
import CustomTimeComponent from "../CustomTimeComponent/CustomTimeComponent";
import { toast } from "react-toastify";

export const UpsertPharmacyComponent = () => {

  const [IsActive, setIsActive] = useState(false);
  const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);
  const { pharmacyId } = useParams();
  const [ pharmacyIdState, setPharmacyIdState] = useState(pharmacyId);
  useEffect(()=>{
    if(pharmacyIdState){
      setIsActive(true);
      setFormDataAttribute("id", pharmacyIdState, setPharmacyFormData, pharmacyFormData);
      setFormDataAttribute("pharmacyId", pharmacyIdState, setUserFormData, userFormData);
    }
  },[pharmacyIdState])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PageDown" || e.key === "PageUp") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  useEffect(() => {
    if (pharmacyId) onComponentMount(LayoutProviderValues.UPDATE);
    else onComponentMount(LayoutProviderValues.ADD);
  }, [onComponentMount, onComponentUnmount]);

  const [dataFromServer, setDataFromServer] = useState({
    pharmaCompanies: [],
    cities: [],
  });

  const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
  
  const [pharmacyFormData, setPharmacyFormData] = useState({
    id: undefined,
    address: undefined,
    openTime: undefined,
    workingWeekOpenTime: undefined,
    workingWeekCloseTime: undefined,
    weekendOpenTime: undefined,
    weekendCloseTime: undefined,
    longitude: undefined,
    latitude: undefined,
    pharmaCompanyID: undefined,
    cityID: undefined,
  });

  const [userFormData, setUserFormData] = useState({    
    pharmacyId: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
  });

  
  function fillNullValues(originalObject, fillObject) {
    const result = { ...originalObject };
    for (const key in originalObject) {
      if (originalObject[key] === undefined && fillObject[key]) {
        result[key] = fillObject[key];
      }
    }

    return result;
  }
  console.log(pharmacyFormData)

  async function init() {
    let tmpObject,tmpPharmacistObject, tmpCities, tmpPharmaCompanies;

    try {
      if (pharmacyId) {
        tmpObject = await getPharmacyById(pharmacyId);
        tmpPharmacistObject = await GetPharmacist(pharmacyId);
        console.log(tmpPharmacistObject)
        if (
          tmpObject.status === Success &&
          tmpPharmacistObject.status === Success
          ) {            
            setPharmacyFormData(fillNullValues(pharmacyFormData, tmpObject.data));
            setUserFormData(fillNullValues(userFormData, tmpPharmacistObject.data));
        } else {
          setStateInfo(StateInfos.ERROR);
        }
      }

      tmpCities = await getAllCities();
      tmpPharmaCompanies = await getAllPharmaCompanies();

      if (
        tmpCities.status === Success &&
        tmpPharmaCompanies.status === Success
      ) {
        setDataFromServer({
          cities: tmpCities.data,
          pharmaCompanies: tmpPharmaCompanies.data,
        });

        setStateInfo(StateInfos.LOADED);
      } else {
        setStateInfo(StateInfos.ERROR);
      }
    } catch (error) {
      console.error("Error in init function:", error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const setFormDataAttribute = (name, value, setFormData, formData) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e, setFormData, formData) => {
    setFormDataAttribute(e.target.name, e.target.value, setFormData, formData);
  };
  
  const submitPharmacy = async () => {    
    let res = await upsertPharmacy(pharmacyFormData);
    if(res.status === Success){
      setPharmacyIdState(res.data);      
      toast.success("Успіх!");
    }else{      
      toast.error("Помилка");
    }
  };
  const submitPharmacist = async () => {    
    console.log(userFormData)
    let res = await upsertPharmacist(userFormData);
    if(res.status === Success){  
      toast.success("Успіх!");
    }else{      
      toast.error("Помилка");
    }
  };

  if (stateInfo == StateInfos.LOADING) return <div>Loading</div>;

  return (
    <div className={`${styles["row-parent"]} row`}>
      <div className={` ${styles["col-parent-left"]} col-md 6`}>
        <div className={`d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані Аптеки</h4>
            <h3>01.</h3>
          </div>

          <div className="mb-1">
            <label>Адреса</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Введіть адресу аптеки"
              label="Адресса"
              type="text"
              name="address"
              value={pharmacyFormData.address}
              onChange={(e)=>{handleInputChange(e, setPharmacyFormData, pharmacyFormData)}}

            />
          </div>

          <div className="row md-1">
          <div className="col-12 col-md-6">
              <label>Широта</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                label="Широта"
                placeholder="Введіть широту"
                type="text"
                name="latitude"
                value={pharmacyFormData.latitude}
                onChange={(e)=>{handleInputChange(e, setPharmacyFormData, pharmacyFormData)}}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Довгота</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                label="Довгта"
                placeholder="Введіть довготу"
                type="text"
                name="longitude"
                value={pharmacyFormData.longitude}
                onChange={(e)=>{handleInputChange(e, setPharmacyFormData, pharmacyFormData)}}
              />
            </div>            
          </div>

          <div className="dropdown">
            <label>Місто і Фармакомпанія</label>
            <div className=" d-flex">


              <CustomSelectComponent
                selectedId={pharmacyFormData.cityID}
                className={`w-50 ms-1 my-form-select ${styles["my-input-text-form"]} ${styles["custom-combobox"]}`}
                name="cityID"
                placeholder="Місто"
                options={
                  dataFromServer.cities &&
                  dataFromServer.cities.map &&
                  dataFromServer.cities.map((item) => ({
                    value: item.id,
                    label: item.nameCity,
                  }))
                }
                onChange={(selectedOption) => {
                  setPharmacyFormData({
                    ...pharmacyFormData,
                    cityID: selectedOption.value,
                  });
                }}
              />

              <CustomSelectComponent
                selectedId={pharmacyFormData.pharmaCompanyID}
                className={`w-50 ms-1 my-form-select ${styles["my-input-text-form"]} ${styles["custom-combobox"]}`}
                name="pharmaCompanyID"
                placeholder="Фарма компанія"
                options={
                  dataFromServer.pharmaCompanies &&
                  dataFromServer.pharmaCompanies.map &&
                  dataFromServer.pharmaCompanies.map((item) => ({
                    value: item.id,
                    label: item.title,
                  }))
                }
                onChange={(selectedOption) => {
                  setPharmacyFormData({
                    ...pharmacyFormData,
                    pharmaCompanyID: selectedOption.value,
                  });
                }}
              />
            </div>

          </div>

          <div className="mt-2">
            <label>Графік роботи</label>

            <div className={`d-flex  align-items-center`}>
              <label className="me-3 mb-0">пн-пт</label>
              <CustomTimeComponent
                time={pharmacyFormData.workingWeekOpenTime}
                setTime={(time) => setFormDataAttribute("workingWeekOpenTime", time, setPharmacyFormData, pharmacyFormData)}
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
              />
              <Palka />
              <CustomTimeComponent
                time={pharmacyFormData.workingWeekCloseTime}
                setTime={(time) => setFormDataAttribute("workingWeekCloseTime", time, setPharmacyFormData, pharmacyFormData)}
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
              />
            </div>

            <div className={`d-flex mt-2  align-items-center`}>
              <label className="me-3 mb-0">сб-нд</label>
              <CustomTimeComponent
                time={pharmacyFormData.weekendOpenTime}
                setTime={(time) => setFormDataAttribute("weekendOpenTime", time,setPharmacyFormData,pharmacyFormData)}
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
              />
              <Palka />
              <CustomTimeComponent
                time={pharmacyFormData.weekendCloseTime}
                setTime={(time) => setFormDataAttribute("weekendCloseTime", time,setPharmacyFormData,pharmacyFormData)}
                className={`input-text-form  ${styles["my-input-text-form-time"]}`}
              />
            </div>
          </div>

          <button className="brn-form brn-primary-form mt-auto" type="submit" onClick={submitPharmacy}>
            Зберегти
          </button>
        </div>
      </div>

      <div
        disabled={!IsActive}        
        className={`    ${styles["col-parent-right"]
          } col-md 6`}
      >
        <div className={` d-flex flex-column ${styles["div-parent-block"]}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Дані формацевта</h4>
            <h3>02.</h3>
          </div>

          <div className="mb-1">
            <label>Електонна пошта</label>
            <input
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              label="Електонна пошта"
              placeholder="Введіть електронну пошту фармацевта"
              type="text"
              name="email"
              value={userFormData.email}
              onChange={(e)=>{handleInputChange(e, setUserFormData, userFormData)}} />

          </div>
          <div className="mb-1">
            <label>Імʼя</label>
            <input
              placeholder="Введіть імʼя фармафармацевта"
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              label="Ім'я"
              type="text"
              name="username"
              value={userFormData.username}
              onChange={(e)=>{handleInputChange(e, setUserFormData, userFormData)}} />

          </div>

          <div className="mb-1">
            <label>Пароль</label>
            <input
              placeholder="Введіть пароль"
              className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
              label="Пароль"
              type="password"
              name="password"
              value={userFormData.password}
              onChange={(e)=>{handleInputChange(e, setUserFormData, userFormData)}}
            />
          </div>

          <button className="brn-form brn-primary-form mt-auto" onClick={submitPharmacist}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpsertPharmacyComponent;
