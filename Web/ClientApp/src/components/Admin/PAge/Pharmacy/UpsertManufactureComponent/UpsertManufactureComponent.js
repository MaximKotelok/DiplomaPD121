import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./UpsertManufactureComponent.module.css";

import BtnWarningModal from "../../../Common/BtnWarningModal/BtnWarningModal";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import CustomSelectComponent from "../../../../Common/CustomSelectComponent/CustomSelectComponent";

import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { getManufacturerById, upsertManufacturer } from "../../../../../services/manufacture";
import { getAllCountries } from "../../../../../services/country";
import { toast } from "react-toastify";
import { ManufacturerListPath, adminRoutePath } from "../../../../../utils/TablesPathes";
import { checkFormParamsAreNotEmpty } from "../../../../../utils/Functions";


export const UpsertManufactureComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathToManufacturerTable } = location.state || {pathToManufacturerTable: `${adminRoutePath}/${ManufacturerListPath}`};

    const { manufacturerId } = useParams();

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [formData, setFormData] = useState({
        id: undefined,
        name: undefined,
        address: undefined,
        urlSite: undefined,
        countryID: undefined,
    });

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

    const [dataFromServer, setDataFromServer] = useState({
        countries: [],
    });

    async function init() {
        let tmpObject, tmpCountries;

        try {
            if (manufacturerId) {
                tmpObject = await getManufacturerById(manufacturerId);


                if (tmpObject.status === Success) {
                    tmpObject = {
                        id: manufacturerId,
                        name: tmpObject.data.name,
                        urlSite: tmpObject.data.urlSite,
                        address: tmpObject.data.address,
                        countryID: tmpObject.data.countryManufactureID,
                    }
                    setFormData(tmpObject);
                }
            }

            tmpCountries = await getAllCountries();

            if (tmpCountries.status === Success) {
                setDataFromServer({
                    countries: tmpCountries.data,
                });

                setStateInfo(StateInfos.LOADED);
            } else {
                setStateInfo(StateInfos.ERROR);
            }
        } catch (error) {
            console.error("Error in init function:", error);
            setStateInfo(StateInfos.ERROR);
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
        const res = await upsertManufacturer(formData);

        if (res.status === Success) {
            toast.success("Успіх")
           navigate(pathToManufacturerTable)
        } else {
            toast.error("Помилка")
        }
    };


    if (stateInfo === StateInfos.LOADING)
        return "Loading...";
    if (stateInfo === StateInfos.ERROR)
        return "Error...";
    return (
        <div className={`${styles["row-parent"]}`}>
            <div className={`${styles["box-container"]} row`}>
                <divv className="">
                    <h6 className={`col-12 ${styles["header-text-add"]}`}>
                        Додавання виробника
                    </h6>
                </divv>

                <div className={`row ${styles["card-border"]}`}>
                    <div className={`d-flex   justify-content-between `}>
                        <InpurtStandart
                            placholder={"Введіть назву виробника товару..."}
                            label={"Назва виробника"}
                            className={"me-3"}
                            onChange={handleInputChange}
                            value={formData.name}
                            name="name"
                        />
                        <InpurtStandart
                            placholder={"http://www.example.com"}
                            label={"URL сайту виробника"}
                            className={"me-3"}
                            onChange={handleInputChange}
                            value={formData.urlSite}
                            name="urlSite"
                        />
                        <div className="">
                            <div>
                                <label>Країна виробника</label>
                            </div>
                            <CustomSelectComponent
                                className={` ms-1 my-form-select ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
                                selectedId={formData.countryID}
                                name="countryID"
                                placeholder="Країна"
                                options={
                                    dataFromServer.countries &&
                                    dataFromServer.countries.map &&
                                    dataFromServer.countries.map((item) => ({
                                        value: item.id,
                                        label: item.name,
                                    }))
                                }
                                onChange={(selectedOption) => {
                                    setFormData({
                                        ...formData,
                                        countryID: selectedOption.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className={`d-flex   justify-content-between `}>
                        <InpurtStandart
                            placholder={"Львів, вул. Джерельна, 47"}
                            label={"Місто / Вулиця / Будинок"}
                            className={"me-3"}
                            onChange={handleInputChange}
                            value={formData.address}
                            name="address"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div>
                        <BtnWarningModal onCancel={()=>navigate(pathToManufacturerTable)} onConfirm={submit} openIf={()=>{
                                    if(!checkFormParamsAreNotEmpty(formData, ["id"])){
                                        toast.error("Не всі поля заповнені");
                                        return false;
                                    }
                                    return true;
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
