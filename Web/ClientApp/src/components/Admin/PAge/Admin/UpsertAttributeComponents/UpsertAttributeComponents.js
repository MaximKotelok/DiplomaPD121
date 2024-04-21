import React, { useState, useEffect } from "react";
import styles from "./UpsertAttributeComponents.module.css";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { useParams } from "react-router-dom";
import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { getAttributeById, upsertAttribute } from "../../../../../services/attributes";
import { getAllAttributeGroups } from "../../../../../services/attributeGroup";
import CustomSelectComponent from "../../../../Common/CustomSelectComponent/CustomSelectComponent";
import { toast } from "react-toastify";


export const UpsertAttributeComponents = () => {
    const { attributeId } = useParams();
    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        id: undefined,
        name: undefined,
        index: undefined,
        productAttributeGroupID: undefined,
    });

    const [dataFromServer, setDataFromServer] = useState({
        groups: [],
    });

    const titleText = attributeId ? "Редагування атрибуту" : "Додавання атрибуту";


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
        const res = await upsertAttribute(formData);

        if (res.status === Success) {
            toast.success("Успіх")
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
                    <TextAreaStandart
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
                        type="submit"
                    >
                        Відмінити
                    </button>
                </div>
            </div>
        </div>
    );
};