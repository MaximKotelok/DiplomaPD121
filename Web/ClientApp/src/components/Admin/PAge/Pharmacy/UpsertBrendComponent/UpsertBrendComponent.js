import React, { useState, useEffect } from "react";
import styles from "./UpsertBrendComponent.module.css";
import BtnWarningModal from "../../../Common/BtnWarningModal/BtnWarningModal";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import CustomSelectComponent from "../../../../Common/CustomSelectComponent/CustomSelectComponent";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { getBrandById, upsertBrand } from "../../../../../services/brand";
import { getAllCountries } from "../../../../../services/country";
import { postPhotoToServer } from "../../../../../services/photo";
import { toast } from "react-toastify";
import { checkFormParamsAreNotEmpty } from "../../../../../utils/Functions";
import { BrandListPath, adminRoutePath } from "../../../../../utils/TablesPathes";
const VisuallyHiddenInput = styled("input")({
    clip: "rgba(229, 229, 234, 1)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const StyledButton = styled(Button)({
    width: "250px",
    height: "42px",
    color: "rgba(122, 122, 122, 1)",
    backgroundColor: "rgba(229, 229, 234, 1)",
    borderRadius: "16px",
    // padding: "12px 12px",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "var(--sans-serif)",
    // marginLeft: "50px",
    margin: "0 auto",
    "&:hover": {
        color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
        backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
    },
});
export const UpsertBrendComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathToBrandTable } = location.state || {pathToBrandTable: `${adminRoutePath}/${BrandListPath}`};

    const [image, setImage] = useState(null);
    const { brandId } = useParams();

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        id: undefined,
        name: undefined,
        description: undefined,
        countryID: undefined,
        pathToPhoto: undefined,
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
            if (brandId) {
                tmpObject = await getBrandById(brandId);


                if (tmpObject.status === Success) {
                    tmpObject = {
                        id: brandId,
                        name: tmpObject.data.name,
                        description: tmpObject.data.description,
                        countryID: tmpObject.data.countryBrandID,
                        pathToPhoto: tmpObject.data.pathToPhoto,
                    }
                    setFormData(tmpObject);
                }
                setPreview(tmpObject.pathToPhoto ? ApiPath + tmpObject.pathToPhoto : null);
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
        let path = "";
        if (image) {
            if (formData.pathToPhoto)
                path = await postPhotoToServer(
                    "Photo/Update",
                    formData.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""),
                    image
                );

            else path = await postPhotoToServer("Photo/Add", "brand", image);
            if (path.status === Success) {
                path = `/images/brand/${path.data}`;
            }
        } else if (formData.pathToPhoto) {
            path = formData.pathToPhoto;
        }

        formData["pathToPhoto"] = path;

        const res = await upsertBrand(formData);

        if (res.status === Success) {
            toast.success("Успіх")
            navigate(pathToBrandTable)
        } else {
            toast.error("Помилка")
        }
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(file);
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
                        {brandId ? "Оновлення бренду" : "Додавання бренду"}
                    </h6>
                </divv>
                <div className={`row ${styles["card-border"]}`}>
                    <div className={`col-4 d-flex  flex-column `}>
                        <label className={`${styles["label-head"]}`}>Фото</label>
                        <div className={`d-flex flex-column  justify-content-center `}>
                            <CustomImgComponent
                                src={`${preview}`} alt="no photo" className={`${styles["img-product"]} mb-2`} />

                            <StyledButton
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                            >
                                Оберіть файл
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </StyledButton>
                        </div>
                    </div>

                    <div className={`col-8 `}>
                        <div className={`d-flex   justify-content-between `}>
                            <div className=" flex-grow-1 mb-1 me-3">
                                <label>Назва</label>
                                <input
                                    className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                                    placeholder="Введіть назву бренду"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="dropdown">
                                <div>
                                    <label>Країна</label>
                                </div>

                                <CustomSelectComponent
                                    className={`ms - 1 my-form-select ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
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
                        <div>
                            <div className="mb-1">
                                <label>Опис</label>
                                <textarea
                                    className={`${styles["text-area-zayavka"]}`}
                                    placeholder="Ведіть опис бренду"
                                    type="text"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div>
                        <BtnWarningModal onCancel={()=>navigate(pathToBrandTable)} onConfirm={submit} openIf={()=>{
                                    if(!checkFormParamsAreNotEmpty(formData, ["id", "pathToPhoto"])){
                                        toast.error("Не всі поля заповнені");
                                        return false;
                                    }
                                    return true;
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};