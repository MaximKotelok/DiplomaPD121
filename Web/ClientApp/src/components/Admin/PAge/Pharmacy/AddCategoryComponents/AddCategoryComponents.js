import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./AddCategoryComponents.module.css";
import { CSSTransition } from "react-transition-group";
import { CategoryBlock } from "./components/CategoryBlock/CategoryBlock";
import { SelectPhoto } from "./components/SelectPhoto/SelectPhoto";
import { ReactComponent as ZnakOkloko } from "./znakOkloko.svg";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import CustomSelectComponent from "../../../../Common/CustomSelectComponent/CustomSelectComponent";

import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { GetCategoryByIdForAdmin, upsertCategory, getAllCategories } from "../../../../../services/category";
import { postPhotoToServer } from "../../../../../services/photo";
import { toast } from "react-toastify";

export const AddCategoryComponents = () => {
    const [image, setImage] = useState(null);
    const [recomendedImage, setRecomendedImage] = useState(null);
    const { categoryId } = useParams();

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [preview, setPreview] = useState(null);
    const [recomendedPreview, setRecomendedPreview] = useState(null);
    const [formData, setFormData] = useState({
        id: undefined,
        title: undefined,
        parentCategoryID: undefined,
        isRecomended: undefined,
        pathToPhoto: undefined,
        pathToRecomendedPhoto: undefined,
    });
    const [dataFromServer, setDataFromServer] = useState({
        categories: [],
    });
    const navigate = useNavigate();


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

    async function init() {
        let tmpObject, tmpCategories;

        try {
            if (categoryId) {
                tmpObject = await GetCategoryByIdForAdmin(parseInt(categoryId));


                if (tmpObject.status === Success) {
                    tmpObject = {
                        id: categoryId,
                        title: tmpObject.data.title,
                        parentCategoryID: tmpObject.data.parentCategoryID,
                        isRecomended: tmpObject.data.isRecomended,
                        pathToPhoto: tmpObject.data.pathToPhoto,
                        pathToRecomendedPhoto: tmpObject.data.pathToRecomendedPhoto
                    }
                    setFormData(tmpObject);
                }
                setPreview(tmpObject.pathToPhoto ? ApiPath + tmpObject.pathToPhoto : null);
                setRecomendedPreview(tmpObject.pathToRecomendedPhoto ? ApiPath + tmpObject.pathToRecomendedPhoto : null);
            }

            tmpCategories = await getAllCategories();

            if (tmpCategories.status === Success) {
                setDataFromServer({
                    categories: tmpCategories.data,
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

    const postCategoryPhoto = async (postPath, image, formDataPath) => {
        let path = "";
        if (image) {
            if (formDataPath)
                path = await postPhotoToServer(
                    "Photo/Update",
                    formDataPath,
                    image
                );

            else path = await postPhotoToServer("Photo/Add", "category/"+postPath, image);
            if (path.status === Success) {
                path = `/images/category/${postPath}/${path.data}`;
            }
        } else if (formData.pathToPhoto) {
            path = formData.pathToPhoto;
        }
        return path;
    }


    const handleImageChange = (file, isRecomended) => {
        if (!isRecomended)
            setImage(file);
        else
            setRecomendedImage(file);
    };

    const submit = async () => {
        
        let path = image? await postCategoryPhoto("png", 
            image,
            formData.pathToPhoto?
                formData.pathToPhoto.replace(/[\/\\]images[\/\\]/g, "")
                :formData.pathToPhoto
            ) : formData.pathToPhoto;
        let recomendedPath = recomendedImage? await postCategoryPhoto("recomended", 
            recomendedImage,
            formData.pathToRecomendedPhoto?
                formData.pathToRecomendedPhoto.replace(/[\/\\]images[\/\\]/g, "")
                :formData.pathToRecomendedPhoto
        ) : formData.pathToRecomendedPhoto;

        formData["pathToPhoto"] = path;
        formData["pathToRecomendedPhoto"] = recomendedPath;

        const res = await upsertCategory(formData);

        if (res.status === Success) {
            toast.success("Успіх");
            navigate(-1);
        } else {
            toast.error("Помилка")
        }
    }


    if (stateInfo === StateInfos.LOADING)
        return "Loading...";
    if (stateInfo === StateInfos.ERROR)
        return "Error...";
    return (
        <div className={`${styles["row-parent"]}`}>
            <div className={`${styles["box-container"]} d-flex flex-column `}>
                <h4 className={`${styles["text-header-page"]}`}>Додавання категорії</h4>

                <div className="row" style={{ margin: 0, padding: 0 }}>
                    <div className={`col-6`}>
                        <div className="mb-1">
                            <label>Назва категорії</label>
                            <input
                                placeholder="Введіть назву нової категорї..."
                                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                                label="Назва"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>
                        <div className="dropdown">
                            <div>
                                <label>Батьківська категорія</label>
                            </div>
                            <CustomSelectComponent
                                selectedId={formData.parentCategoryID}
                                className={` ms-1 my-form-select ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
                                name="parentCategoryID"
                                placeholder="Фарма компанія"
                                options={
                                    dataFromServer.categories &&
                                    dataFromServer.categories.map &&
                                    dataFromServer.categories.map((item) => ({
                                        value: item.id,
                                        label: item.title,
                                    }))
                                }
                                onChange={(selectedOption) => {
                                    setFormData({
                                        ...formData,
                                        parentCategoryID: selectedOption.value,
                                    });
                                }}
                            />
                        </div>

                        <SelectPhoto text={"Фото"} handleImageChange={(e) => { handleImageChange(e, false) }} pathToPhoto={formData.pathToPhoto} />
                    </div>

                    <div className={`col-6`}>
                        <div className="d-flex align-items-center justify-content-between">
                            <CheckedBox
                                onChange={(a) => { setFormDataAttribute("isRecomended", a) }}
                                name="isRecomended"
                                value={formData.isRecomended}
                                text="Чи рекомендована категорія?"
                            />
                            <ZnakOkloko />
                        </div>

                        <div className={styles.photoContainer}>
                            <CSSTransition
                                in={formData.isRecomended}
                                timeout={300}
                                classNames={{
                                    enter: styles.fadeEnter,
                                    enterActive: styles.fadeEnterActive,
                                    exit: styles.fadeExit,
                                    exitActive: styles.fadeExitActive,
                                }}
                                unmountOnExit
                            >
                                <SelectPhoto text={`Фото для “Актуальних категорій”`} handleImageChange={(e) => { handleImageChange(e, true) }} pathToPhoto={formData.pathToRecomendedPhoto} />
                            </CSSTransition>
                        </div>
                    </div>
                </div>

                <div className={`d-flex justify-content-center mt-auto`}>
                    <button
                        className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
                        onClick={submit}
                    >
                        Зберегти
                    </button>

                    <button
                        className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
                        type="submit"
                        onClick={() => navigate(-1)}
                    >
                        Відмінити
                    </button>
                </div>
            </div>
        </div>
    );
};
