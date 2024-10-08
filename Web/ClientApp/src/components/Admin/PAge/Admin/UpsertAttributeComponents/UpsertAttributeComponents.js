import React, { useState, useEffect } from "react";
import styles from "./UpsertAttributeComponents.module.css";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { getAttributeById, upsertAttribute } from "../../../../../services/attributes";
import { getAllAttributeGroups } from "../../../../../services/attributeGroup";
import CustomSelectComponent from "../../../../Common/CustomSelectComponent/CustomSelectComponent";
import { toast } from "react-toastify";
import { checkFormParamsAreNotEmpty } from "../../../../../utils/Functions";
import { AttributeListPath, adminRoutePath } from "../../../../../utils/TablesPathes";
import { SelectPhoto } from "../../Pharmacy/AddCategoryComponents/components/SelectPhoto/SelectPhoto";
import { postPhotoToServer } from "../../../../../services/photo";


export const UpsertAttributeComponents = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathToAttributeTable } = location.state || {pathToAttributeTable: `${adminRoutePath}/${AttributeListPath}`};

    const { attributeId } = useParams();
    const [image, setImage] = useState(null);
    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        id: undefined,
        name: undefined,
        index: undefined,
        productAttributeGroupID: undefined,
        pathToPhoto: undefined,
    });

    const [dataFromServer, setDataFromServer] = useState({
        groups: [],
    });

    const titleText = attributeId ? "Редагування атрибуту" : "Додавання атрибуту";
    const handleImageChange = (file) => {
        setImage(file);
    };

    async function init() {
        let tmpObject, tmpGroups;

        try {
            if (attributeId) {
                tmpObject = await getAttributeById(attributeId);


                if (tmpObject.status === Success) {
                    tmpObject = {
                        id: attributeId,
                        name: tmpObject.data.name,
                        index: tmpObject.data.index,
                        productAttributeGroupID: tmpObject.data.productAttributeGroupID,
                        pathToPhoto: tmpObject.data.pathToPhoto
                    }
                    setFormData(tmpObject);
                }
                setPreview(tmpObject.pathToPhoto ? ApiPath + tmpObject.pathToPhoto : null);
            }

            tmpGroups = await getAllAttributeGroups();

            if (tmpGroups.status === Success) {
                setDataFromServer({
                    groups: tmpGroups.data,
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

            else path = await postPhotoToServer("Photo/Add", "attribute", image);
            if (path.status === Success) {
                path = `/images/attribute/${path.data}`;
            }
        } else if (formData.pathToPhoto) {
            path = formData.pathToPhoto;
        }

        formData["pathToPhoto"] = path;


        if(!checkFormParamsAreNotEmpty(formData, ["id", "pathToPhoto"])){
            toast.error("Не всі поля заповнені");
            return;
        }
      
        const res = await upsertAttribute(formData);

        if (res.status === Success) {
            toast.success("Успіх");
            navigate(pathToAttributeTable);
        } else {
            toast.error("Помилка");
        }
    };

    if (stateInfo === StateInfos.LOADING)
        return "Loading...";
    if (stateInfo === StateInfos.ERROR)
        return "Error...";
    return (
        <div className={`${styles["row-parent"]}`}>
            <div className={`${styles["box-container"]}  d-flex flex-column`}>
                <div>
                    <h4 className={`${styles["head-h4"]} mb-4`}>{titleText}</h4>

                    <InpurtStandart
                        label={"Назва"}
                        placholder={"Ведіть назву ..."}
                        onChange={handleInputChange}
                        value={formData.name}
                        name="name"
                    />
                    <InpurtStandart
                        label={"Індекс"}
                        placholder={"Ведіть сюди індекс ..."}
                        onChange={handleInputChange}
                        value={formData.index}
                        name="index"
                    />
                    <div className="dropdown">
                        <div>
                            <label>Група</label>
                        </div>

                        <CustomSelectComponent
                            className={`ms - 1 my-form-select ${styles["my-input-text-form-box"]} ${styles["custom-combobox"]}`}
                            selectedId={formData.productAttributeGroupID}
                            name="productAttributeGroupID"
                            placeholder="Група"
                            options={
                                dataFromServer.groups &&
                                dataFromServer.groups.map &&
                                dataFromServer.groups.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))
                            }
                            onChange={(selectedOption) => {
                                setFormData({
                                    ...formData,
                                    productAttributeGroupID: selectedOption.value,
                                });
                            }}

                        />
                         <SelectPhoto text={`Фото атрибуту`} handleImageChange={(e) => { handleImageChange(e) }} pathToPhoto={formData.pathToPhoto} />
                    </div>
                </div>

                <div className={`d-flex mt-auto`}>
                    <button
                        className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
                        onClick={() => submit()}
                    >
                        Зберегти
                    </button>

                    <button
                        className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
                        onClick={()=>navigate(pathToAttributeTable)}
                    >
                        Відмінити
                    </button>
                </div>
            </div>
        </div>
    );
};