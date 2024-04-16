import "react-quill/dist/quill.snow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  getPharmaComapnyAdmin,
  getPharmaCompanyById,
  upsertPharmaCompany,
  upsertPharmaCompanyAdmin
} from "../../../../../../services/pharmaCompany";
import {
  StateInfos,
  Success,
  LayoutProviderValues,
  ApiPath
} from "../../../../../../utils/Constants";
import { postPhotoToServer } from "../../../../../../services/photo";

import InputForPharmaCompanyComponent from "../InputForPharmaCompanyComponent/InputForPharmaCompanyComponent";
import LayoutContext from "../../../../../../layouts/LayoutContext";

import styles from "./UpsertPharmaCompanyComponent.module.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";

import { toast } from "react-toastify";

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
    width: "200px",
    height: "55px",
    color: "rgba(122, 122, 122, 1)",
    backgroundColor: "rgba(229, 229, 234, 1)",
    borderRadius: "16px",
    padding: "16px 20px",
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "var(--sans-serif)",
    marginLeft: "50px",
    "&:hover": {
        color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
        backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
    },
});


const UpsertPharmaCompanyComponent = () => {
  const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);
  const { companyId } = useParams();

    const [IsActive, setIsActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);

    const [pharmaComapnyIdState, setPharmaComapnyIdState] = useState(companyId);

    const [pharmaCompanyFormData, setPharmaCompanyFormData] = useState({
        id: undefined,
        title: "",
        description: "",
        pathToPhoto: ""
    });

    const [userFormData, setUserFormData] = useState({
        pharmaCompanyId: undefined,
        username: "",
        email: "",
        password: "",
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


  useEffect(() => {
      if (pharmaComapnyIdState) {
          setIsActive(true);
          setFormDataAttribute("id", pharmaComapnyIdState, setPharmaCompanyFormData, pharmaCompanyFormData);
          setFormDataAttribute("pharmaCompanyId", pharmaComapnyIdState, setUserFormData, userFormData);
      }
  }, [pharmaComapnyIdState])

  useEffect(() => {
    if (companyId) onComponentMount(LayoutProviderValues.UPDATE);
    else onComponentMount(LayoutProviderValues.ADD);
  }, [onComponentMount, onComponentUnmount]);


  async function init() {
    let tmpObject, tmpPharmCompanyAdminObject;

    try {
      if (companyId) {
          tmpObject = await getPharmaCompanyById(companyId);
          tmpPharmCompanyAdminObject = await getPharmaComapnyAdmin(companyId);

          setPreview(tmpObject.pathToPhoto ? ApiPath + tmpObject.pathToPhoto : null);

        if (tmpObject.status === Success) {
            setPharmaCompanyFormData(tmpObject.data);
        } else {
          setStateInfo(StateInfos.ERROR);
        }
      }
      setStateInfo(StateInfos.LOADED);
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


    const submitPharmaCompany = async () => {

        let path = "";
        if (image) {
            if (pharmaCompanyFormData.pathToPhoto)
                path = await postPhotoToServer(
                    "Photo/Update",
                    pharmaCompanyFormData.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""),
                    image
                );

            else path = await postPhotoToServer("Photo/Add", "brand", image);
            if (path.status === Success) {
                path = `/images/brand / ${path.data}`;
            }
        } else if (pharmaCompanyFormData.pathToPhoto) {
            path = pharmaCompanyFormData.pathToPhoto;
        }

        pharmaCompanyFormData["pathToPhoto"] = path;

        let res = await upsertPharmaCompany(pharmaCompanyFormData);
        if (res.status === Success) {
            setPharmaComapnyIdState(res.data);
            toast.success("Успіх!");
        } else {
            toast.error("Помилка");
        }
    };
    const submitPharmaCompanyAdmin = async () => {
        console.log(userFormData)
        let res = await upsertPharmaCompanyAdmin(userFormData);
        if (res.status === Success) {
            toast.success("Успіх!");
        } else {
            toast.error("Помилка");
        }
    };

  if (stateInfo == StateInfos.LOADING) return <div>Loading</div>;

    return (

        <div className={`${styles["row-parent"]} row`}>
            <div className={` ${styles["col-parent-left"]} col-md 6`}>
                <div className={`d-flex flex-column ${styles["div-parent-block"]}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Дані Фарма-Компанії</h4>
                        <h3>01.</h3>
                    </div>
                    <div className="mb-1">
                        <label>Назва</label>
                        <input
                            className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                            placeholder="Введіть назву фарма-компанії"
                            type="text"
                            name="title"
                            value={pharmaCompanyFormData.title}
                            onChange={(e) => { handleInputChange(e, setPharmaCompanyFormData, pharmaCompanyFormData) }}
                        />
                    </div>
                    <div className="mb-1">
                        <label>Опис</label>
                        <textarea
                            className={`${styles["text-area-zayavka"]}`}
                            placeholder="Ведіть опис фарма-компанії"
                            type="text"
                            rows={3}
                            name="description"
                            value={pharmaCompanyFormData.description}
                            onChange={(e) => { handleInputChange(e, setPharmaCompanyFormData, pharmaCompanyFormData) }}
                        />
                    </div>
                    <div>
                        <label>Фото</label>

                        <div className={`d-flex  align-items-center`}>
                            <CustomImgComponent
                                src={`${preview}`} alt="no photo" className={`${styles["img-product"]} mb-2`}/>
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

                    <div className={`d-flex mt-auto`}>
                        <button
                            className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
                            type="submit"
                            onClick={() => submitPharmaCompany()}
                        >
                            Зберегти
                        </button>

                        <button
                            className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
                            type="submit"
                        >
                            Відмінити
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={` ${!IsActive ? styles["disable-block"] : ""}    ${styles["col-parent-right"]
                    } col-md 6`}
            >
                <div className={` d-flex flex-column ${styles["div-parent-block"]}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Дані адміна фарма-компанії</h4>
                        <h3>02.</h3>
                    </div>

                    <div className="mb-1">
                        <label>Електронна пошта</label>
                        <input
                            className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                            placeholder="Введіть електронну пошту компанії"
                            type="text"
                            name="email"
                            value={userFormData.email}
                            onChange={(e) => { handleInputChange(e, setUserFormData, userFormData) }}
                        />
                    </div>

                    <div className="mb-1">
                        <label>Імʼя</label>
                        <input
                            className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                            placeholder="Ім'я"
                            type="text"
                            name="username"
                            value={userFormData.username}
                            onChange={(e) => { handleInputChange(e, setUserFormData, userFormData) }}
                        />
                    </div>

                    <div className="mb-1">
                        <label>Пароль</label>
                        <input
                            className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                            placeholder="Пароль"
                            type="text"
                            name="password"
                            value={userFormData.password}
                            onChange={(e) => { handleInputChange(e, setUserFormData, userFormData) }}
                        />
                    </div>



                    <div className={`d-flex mt-auto`}>
                        <button
                            className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
                            type="submit"
                            onClick={() => submitPharmaCompanyAdmin()}
                        >
                            Зберегти
                        </button>

                        <button
                            className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
                            type="submit"
                        >
                            Відмінити
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default UpsertPharmaCompanyComponent;
