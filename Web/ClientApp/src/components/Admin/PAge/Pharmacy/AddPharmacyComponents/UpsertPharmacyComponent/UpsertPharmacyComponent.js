import "react-quill/dist/quill.snow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  getPharmacyById,
  upsertPharmacy,
} from "../../../../../../services/pharmacy";
import { getAllPharmaCompanies } from "../../../../../../services/pharmaCompany";
import { getAllCities } from "../../../../../../services/city";
import {
  StateInfos,
  Success,
  LayoutProviderValues,
} from "../../../../../../utils/Constants";

import CustomSelectComponent from "../CustomSelectComponent/CustomSelectComponent";
import InputForPharmacyComponent from "../InputForPharmacyComponent/InputForPharmacyComponent";

import "./UpsertPharmacyComponent.css";
import LayoutContext from "../../../../../../layouts/LayoutContext";

const UpsertPharmacyComponent = () => {
  const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);
  const { pharmacyId } = useParams();

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
  const [formData, setFormData] = useState({
    id: undefined,
    address: undefined,
    openTime: undefined,
    closeTime: undefined,
    longitude: undefined,
    latitude: undefined,
    pharmaCompanyID: undefined,
    cityID: undefined,

    username: undefined,
    email: undefined,
    password: undefined,
  });

  async function init() {
    let tmpObject, tmpCities, tmpPharmaCompanies;

    try {
      if (pharmacyId) {
        tmpObject = await getPharmacyById(pharmacyId);
        if (tmpObject.status === Success) {
          setFormData(tmpObject.data);
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

  const setFormDataAttribute = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    setFormDataAttribute(e.target.name, e.target.value);
  };

  const submit = async () => {
    upsertPharmacy(formData);
  };

  if (stateInfo == StateInfos.LOADING) return <div>Loading</div>;

  return (
    <div className="row add-product-main-container">
      <div className="add-product-left-container">
        <div className="inner-add-product-left-container"></div>
      </div>

      <div className="add-product-right-container">
        <div className="flip">
          <InputForPharmacyComponent
            className="margin-bottom"
            label="Адресса"
            placeholder="Введіть адрессу"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <InputForPharmacyComponent
            className="margin-bottom"
            label="Час відкриття"
            placeholder="Введіть час відкриття"
            type="text"
            name="openTime"
            value={formData.openTime}
            onChange={handleInputChange}
          />
          <InputForPharmacyComponent
            className="margin-bottom"
            label="Час закриття"
            placeholder="Введіть час закриття"
            type="text"
            name="closeTime"
            value={formData.closeTime}
            onChange={handleInputChange}
          />
          <InputForPharmacyComponent
            className="margin-bottom"
            label="Довгта"
            placeholder="Введіть довготу"
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          />
          <InputForPharmacyComponent
            className="margin-bottom"
            label="Широта"
            placeholder="Введіть широту"
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          />
          <div className="margin-bottom select-div">
            <CustomSelectComponent
              selectedId={formData.pharmaCompanyID}
              className="me-1"
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
                setFormData({
                  ...formData,
                  pharmaCompanyID: selectedOption.value,
                });
              }}
            />
            <CustomSelectComponent
              selectedId={formData.cityID}
              className="ms-1"
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
                setFormData({
                  ...formData,
                  cityID: selectedOption.value,
                });
              }}
            />
          </div>

          {pharmacyId == null && (
            <div className="mt-4">
              <h2>New Pharmacy User</h2>
              <InputForPharmacyComponent
                className="margin-bottom"
                label="Username"
                placeholder="Введіть ім`я користувача"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <InputForPharmacyComponent
                className="margin-bottom"
                label="Email"
                placeholder="Введіть пошту користувача"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputForPharmacyComponent
                className="margin-bottom"
                label="Password"
                placeholder="Введіть пароль користувача"
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="margin-bottom">
            <button onClick={() => submit()}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpsertPharmacyComponent;
