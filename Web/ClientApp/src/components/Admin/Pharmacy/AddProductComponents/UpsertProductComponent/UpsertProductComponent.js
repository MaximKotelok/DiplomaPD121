import 'react-quill/dist/quill.snow.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactQuill from 'react-quill';
import React, { useEffect, useState, useContext } from 'react';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import { upsertProduct, getProductById, getExistAttributeVariantsList } from "../../../../../services/product"
import { postPhotoToServer } from "../../../../../services/photo"
import { getAllTypes, getGroupById } from "../../../../../services/group"
import { getAllManufacturers } from "../../../../../services/manufacture"
import { getAllBrands } from "../../../../../services/brand"

import { StateInfos, Success, LayoutProviderValues, GetCategoriesForProductAdd } from '../../../../../utils/Constants';

import ImageUploaderComponent from '../ImageUploaderComponent/ImageUploaderComponent';
import InputForProductComponent from '../InputForProductComponent/InputForProductComponent'


import "./UpsertProductComponent.css"
import UpsertDescriptionComponent from '../UpsertDescriptionComponent/UpsertDescriptionComponent';
import FormDataStandartInputsComponent from '../FormDataStandartInputsComponent/FormDataStandartInputsComponent';
import LayoutAdmin from '../../../../../layouts/AdminLayout/LayoutAdmin';
import { getAllCategories, getFirstNCategoryByTitle } from '../../../../../services/category';
import TypeAndCategoryComboboxComponent from '../TypeAndCategoryComboboxComponent/TypeAndCategoryComboboxComponent';
import { listData, listDataTemplate, productTemplate } from './ProductTemplates';
import { updateObj } from '../../../../../utils/Functions';
import Swal from 'sweetalert2';

const UpsertProductComponent = () => {

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);

    const { categoryId, typeId, productId } = useParams();

    const [data, setData] = useState({
        descriptionName: "Опис",
        image: null,
        formData: productTemplate,
        isTypeDisabled:false
    })

    const [dataFromServer, setDataFromServer] = useState(listDataTemplate);

    const [additionalAttribute, setAdditionalAttribute] = useState([]);

    const setCustomState = (setState, name, updates) => {
        setState((prevState) => updateObj(prevState, name, updates));
    };

    async function getDataOrSetError(getService, setData) {
        if (stateInfo !== StateInfos.ERROR) {
            let res = await getService()
            if (res.status === Success)
                await setData(res.data);
            else
                setStateInfo(StateInfos.ERROR)
        }
    }

    //#region init

    async function init() {
        if (categoryId || typeId)
            setCustomState(setData, "formData", { ...data.formData, categoryID: categoryId, typeID: typeId })
        let tmpObject;
        try {
            if (productId) {
                await getDataOrSetError(
                    async () => await getProductById(productId),
                    async (value) => {
                        tmpObject = {
                            ...value,
                            ...(value.product || {})
                        };

                        if (tmpObject.properties) {
                            setAdditionalAttribute(tmpObject.properties.map(a => {
                                return {
                                    id: a.id,
                                    name: a.name,
                                    value: a.value
                                }
                            }))
                        }
                    },
                );
                setCustomState(setData, "isTypeDisabled", true);
            }
            

            await getDataOrSetError(
                async () => {
                    return await getGroupById(tmpObject && tmpObject.productAttributeGroupID ? tmpObject.productAttributeGroupID : typeId)
                },
                async (value) => {
                    
                        let tmpMainAttributes = await getExistAttributeVariantsList(value.existAttributes);

                        let newData = { ...data.formData };
                        if (!productId) {
                            newData = { ...newData, description: value.description }
                        }
                        if (tmpMainAttributes) {
                            newData = { ...newData, ...Object.fromEntries(tmpMainAttributes.map(a => [a.name, undefined])) };
                            setCustomState(setDataFromServer, "mainAttribute", tmpMainAttributes)
                        }
                        if (tmpObject) {
                            newData = fillNullValues(newData, tmpObject)
                        }
                        
                        setCustomState(setData, "formData", newData);
                    
                    if (value.descriptionName) {
                        setCustomState(setData, "descriptionName", value.descriptionName);
                    }
                    if (value.attributesInGroup && value.attributesInGroup.length)
                        setCustomState(setDataFromServer, "attributes", value.attributesInGroup)
                    else
                        setCustomState(setDataFromServer, "attributes", [])
                }

            )


            await getDataOrSetError(
                getAllManufacturers,
                async (value) => { setCustomState(setDataFromServer, "manufacturers", value) }
            )

            await getDataOrSetError(
                getAllBrands,
                async (value) => { setCustomState(setDataFromServer, "brands", value) }
            )
            await getDataOrSetError(
                getAllCategories,
                async (value) => { setCustomState(setDataFromServer, "categories", value) }
            )
            await getDataOrSetError(
                getAllTypes,
                async (value) => { setCustomState(setDataFromServer, "types", value) }
            )
            if (stateInfo == StateInfos.LOADING)
                setStateInfo(StateInfos.LOADED);


        } catch (error) {
            console.error("Error in init function:", error);
            setStateInfo(StateInfos.ERROR);
        }
    }



    useEffect(() => {
        init();
    }, [])


    function fillNullValues(originalObject, fillObject) {
        const result = { ...originalObject };
        for (const key in originalObject) {
            if (originalObject[key] === undefined && fillObject[key]) {
                result[key] = fillObject[key];
            }
        }

        return result;
    }


    //#endregion



    //#region submit
    const submit = async () => {
        let a = "/images/product/1.png";
        if (data.image) {
            if (data.pathToPhoto)
                a = await postPhotoToServer("Photo/Update", data.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""), data.image);
            else
                a = await postPhotoToServer("Photo/Add", "product", data.image);
            a = `/images/product/${a}`;
        } else if (data.formData.pathToPhoto) {
            a = data.formData.pathToPhoto;
        }

        data.formData["pathToPhoto"] = a;

        upsertProduct(data.formData, { additionalAttribute });


    }

    //#endregion

    const setFormDataAttribute = (name, value) => {
        setCustomState(setData, "formData", updateObj(data.formData, name, value));
    }

    //#region OnChanges

    const handleAdditionalChange = (id, name, value) => {
        setAdditionalAttribute((prevData) => {
            const newData = [...prevData];
            let index = newData.indexOf(newData.find(a => a.id === id));
            if (index !== -1) {
                newData[index] = { id: id, name: name, value: value };
            } else {
                newData.push({ id: id, name: name, value: value });
            }
            return newData;
        });
    };
    function handleAddAdditionalAttribute(id) {

        setAdditionalAttribute((prevData) => {
            let newData = [...prevData]
            let index = newData.indexOf(newData.find(a => a.id === id));

            if (index === -1) {
                index = dataFromServer.attributes.indexOf(dataFromServer.attributes.find(a => a.id === id));


                if (index !== -1) {
                    newData.push({
                        id: dataFromServer.attributes[index].id,
                        name: dataFromServer.attributes[index].name,
                        value: ""
                    });
                }
            }
            return newData;

        });
    };



    function handleRemoveAdditionalAttribute(id) {
        setAdditionalAttribute((prevData) => {
            let newData = [...prevData]
            let index = newData.indexOf(newData.find(a => a.id === id));
            if (index !== -1) {

                newData = newData.slice(0, index).concat(newData.slice(index + 1));
            }
            return newData;
        });
    };

    //#endregion

    if (stateInfo == StateInfos.LOADING)
        return <LayoutAdmin>Loading</LayoutAdmin>

    return (
        <LayoutAdmin additionalHeader={
            <TypeAndCategoryComboboxComponent
                typeId={data.formData.productAttributeGroupID}
                categoryId={data.formData.categoryID}
                categories={dataFromServer.categories}
                types={dataFromServer.types}
                formData={data.formData}
                setFormData={(value) => setCustomState(setData, "formData", value)}
                isTypeDisabled={data.isTypeDisabled}
            />
        }>
            <div className='row add-product-main-container m-2'>
                <div className='row scroll d-flex'>
                    <div className='col-8'>
                        <div className='add-product-left-container'>
                            <div className='inner-add-product-left-container'>
                                <UpsertDescriptionComponent
                                    descriptionName={data.descriptionName}
                                    description={data.formData.description}
                                    setDescription={(a) => {
                                        if(!data.isTypeDisabled)
                                            setCustomState(setData, "isTypeDisabled", true);
                                        setFormDataAttribute("description", a)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-4 round-white-div p-4 upsert-fields-div'>
                        <div className='add-product-right-container'>
                            <FormDataStandartInputsComponent
                                formData={data.formData}
                                setFormData={(name, value) => {
                                    if(!data.isTypeDisabled)
                                            setCustomState(setData, "isTypeDisabled", true);
                                    setCustomState(setData, "formData", {
                                    ...data.formData,
                                    [name]: value
                                })
                                }}
                                listData={dataFromServer}
                            />

                            <div className="margin-bottom">

                                <p className='product-label'>Додаткове поле</p>
                                <Select
                                    className='additional-input margin-bottom'
                                    value={null}
                                    name="additonals"
                                    placeholder="Вага, смак, колір"
                                    options={dataFromServer.attributes.filter(a => {
                                        return !additionalAttribute.length || !additionalAttribute.map || !additionalAttribute.map(b => b.id).includes(a.id)
                                    }).map(item => ({ value: item.id, label: item.name }))
                                    }
                                    onChange={selectedOption => {
                                        if(!data.isTypeDisabled)
                                            setCustomState(setData, "isTypeDisabled", true);
                                        handleAddAdditionalAttribute(selectedOption.value, true)
                                    }}
                                    isSearchable={true}
                                />
                                {
                                    additionalAttribute && additionalAttribute.map(
                                        a => {

                                            return <div key={a.id} className='margin-bottom d-flex align-items-end'>
                                                <InputForProductComponent
                                                    value={a.value}
                                                    className="additional-input me-2"
                                                    placeholder={a.name}
                                                    type="text"
                                                    name={a.id}
                                                    onChange={e => {
                                                        handleAdditionalChange(a.id, a.name, e.target.value)
                                                    }
                                                    }
                                                />
                                                <button className='btn cross-button'
                                                    onClick={e => {
                                                        handleRemoveAdditionalAttribute(a.id)
                                                    }}
                                                ><i className="bi bi-x-lg"></i></button>

                                            </div>
                                        }

                                    )
                                }
                                <p className='product-label'>Оберіть фото</p>
                                <ImageUploaderComponent imageUrl={data.formData.pathToPhoto} selectedImage={data.image} setSelectedImage={(value) => setCustomState(setData, "image", value)} />
                                <button className='mt-2 btn btn-custom additional-input' onClick={() => submit()}>ЗБЕРЕГТИ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );



}


export default UpsertProductComponent;
