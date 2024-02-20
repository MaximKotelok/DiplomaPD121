import 'react-quill/dist/quill.snow.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactQuill from 'react-quill';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import { upsertProduct, getProductById, getExistAttributeVariantsList } from "../../../../../services/product"
import { postPhotoToServer } from "../../../../../services/photo"
import { getGroupById } from "../../../../../services/group"
import { getAllManufacturers } from "../../../../../services/manufacture"
import { getAllBrands } from "../../../../../services/brand"

import { StateInfos, Success, LayoutProviderValues } from '../../../../../utils/Constants';

import ImageUploaderComponent from '../ImageUploaderComponent/ImageUploaderComponent';
import InputForProductComponent from '../InputForProductComponent/InputForProductComponent'
import CustomSelectComponent from '../CustomSelectComponent/CustomSelectComponent';


import "./UpsertProductComponent.css"
import LayoutContext from '../../../../../layouts/LayoutContext';

const UpsertProductComponent = () => {
    const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);
    const { categoryId } = useParams();
    const { typeId } = useParams();
    const { productId } = useParams();

    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === 'PageDown' || e.key === 'PageUp') {
                e.preventDefault();
            }

        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (typeId)
            onComponentMount(LayoutProviderValues.ADD);//"Сторінка додавання товару"); 
        else if (productId)
            onComponentMount(LayoutProviderValues.UPDATE); //"Сторінка оновлення товару");
        return () => {
            onComponentUnmount();
        };
    }, [onComponentMount, onComponentUnmount]);

    //#region data from server
    const [dataFromServer, setDataFromServer] = useState({
        attributes: [],
        brands: [],
        manufacturers: [],
        mainAttribute: []
    });
    //#endregion
    //#region other states    
    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [image, setImage] = useState(null);
    const [descriptionName, setDescriptionName] = useState("Опис");
    const [additionalAttribute, setAdditionalAttribute] = useState([]);
    const [formData, setFormData] = useState({
        id: undefined,
        title: undefined,
        shortDescription: undefined,
        description: undefined,
        manufacturerID: undefined,
        brandID: undefined,
        pathToPhoto: undefined,
        categoryID: categoryId,
        productAttributeGroupID: undefined,
        pharmaCompanyID: 1
    });

    //#endregion

    //#region init
    async function init() {
        let localTypeId = typeId;


        let tmpObject,
            tmpBrands,
            tmpManufacturers,
            tmpAttributes,
            tmpMainAttributes;

        try {
            if (productId) {
                tmpObject = await getProductById(productId)
                let product = tmpObject.data.product ? tmpObject.data.product : tmpObject.data;
                localTypeId = product.productAttributeGroupID

            }

            let res = await getGroupById(localTypeId);
            if (res.data.existAttributes.length > 0) {
                tmpMainAttributes = await getExistAttributeVariantsList(res.data.existAttributes);
            }

            if (res.data.descriptionName) {
                setDescriptionName(res.data.descriptionName);
            }


            tmpAttributes = res;
            //setAttributes(res.data.attributesInGroup);

            tmpManufacturers = await getAllManufacturers();
            tmpBrands = await getAllBrands();
            if (
                tmpBrands.status === Success &&
                tmpManufacturers.status === Success &&
                tmpAttributes.status == Success
            ) {

                //setFormData
                setFormData((prevData) => {
                    let newData = { ...prevData };
                    if (!productId) {
                        newData = { ...newData, description: res.data.description }
                    }
                    if (tmpMainAttributes)
                        newData = { ...newData, ...Object.fromEntries(tmpMainAttributes.map(a => [a.name, undefined])) };
                    if (tmpObject && tmpObject.data) {
                        newData = fillNullValues(newData, tmpObject.data)
                        if (tmpObject.data.product) {
                            newData = fillNullValues(newData, tmpObject.data.product)
                        }
                    }
                    return newData;
                })

                //setDataFromServer
                setDataFromServer({
                    attributes: tmpAttributes.data.attributesInGroup,
                    brands: tmpBrands.data,
                    manufacturers: tmpManufacturers.data,
                    mainAttribute: tmpMainAttributes
                })

                if (tmpObject && tmpObject.data.properties) {

                    setAdditionalAttribute(tmpObject.data.properties.map(a => {
                        return {
                            id: a.id,
                            name: a.name,
                            value: a.value
                        }
                    }))
                    //setAdditionalAttributes()
                }

                //setStateInfo

                setStateInfo(StateInfos.LOADED);
            }



            else {
                setStateInfo(StateInfos.ERROR);
            }

        } catch (error) {
            console.error("Error in init function:", error);
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
        let photoPath = "/images/product/1.png";
        if (image) {
            if (formData.pathToPhoto)
                photoPath = await postPhotoToServer("Photo/Update", formData.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""), image);
            else
                photoPath = await postPhotoToServer("Photo/Add", "product", image);
            if (photoPath.status === Success) {

                photoPath = `/images/product/${photoPath.data}`;
            }
        } else if (formData.pathToPhoto) {
            photoPath = formData.pathToPhoto;
        }


        formData["pathToPhoto"] = photoPath;

        if (typeId)
            upsertProduct(formData, { typeId, additionalAttribute });
        else
            upsertProduct(formData, { additionalAttribute });
    }

    //#endregion

    const setFormDataAttribute = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    //#region OnChanges
    const handleInputChange = (e) => {
        setFormDataAttribute(e.target.name, e.target.value);

    };




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
        return <div>Loading</div>


    return (<div className='row add-product-main-container'>
        <div className='add-product-left-container'>
            <div className='inner-add-product-left-container'>

                <p className='product-label'>{descriptionName}</p>
                <ReactQuill
                    className='description-form-element'
                    theme="snow"
                    value={formData.description}
                    onChange={a => { setFormDataAttribute("description", a) }}
                />
            </div>
        </div>
        <div className='add-product-right-container'>
            <div className='flip'>
                <InputForProductComponent
                    className="margin-bottom"
                    label="Назва товару"
                    placeholder='Введіть назву товару'
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <InputForProductComponent
                    className="margin-bottom"
                    label="Короткий опис"
                    placeholder='Введіть короткий опис'
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                />
                <div className="margin-bottom select-div">
                    <CustomSelectComponent
                        selectedId={formData.manufacturerID}
                        className='me-1'
                        name="manufacturerID"
                        placeholder="Виробник"
                        options={dataFromServer.manufacturers &&
                            dataFromServer.manufacturers.map &&
                            dataFromServer.manufacturers.map(item => ({ value: item.id, label: item.name }))}
                        onChange={selectedOption => {
                            setFormData({
                                ...formData,
                                manufacturerID: selectedOption.value
                            })
                        }}
                    />
                    <CustomSelectComponent
                        selectedId={formData.brandID}
                        className='ms-1'
                        name="brandID"
                        placeholder="Бренд"
                        options={dataFromServer.brands &&
                            dataFromServer.brands.map &&
                            dataFromServer.brands.map(item => ({ value: item.id, label: item.name }))}
                        onChange={selectedOption => {
                            setFormData({
                                ...formData,
                                brandID: selectedOption.value
                            })
                        }}
                    />
                </div>
                <div>
                    {dataFromServer.mainAttribute && dataFromServer.mainAttribute.map &&
                        dataFromServer.mainAttribute.map(a => {

                            if (a.list.length > 0)
                                return (
                                    <div className='margin-bottom'>
                                        <CustomSelectComponent
                                            selectedID={formData[a.name]}
                                            name={a.name}
                                            options={a.list.map(item => ({ value: item.id, label: item.title }))}
                                            onChange={selectedOption => { setFormDataAttribute(a.name, selectedOption.value) }}
                                            placeholder={a.description}
                                            isSearchable={true}
                                        />
                                    </div>
                                )

                        })

                    }
                </div>


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
                    <ImageUploaderComponent imageUrl={formData.pathToPhoto} selectedImage={image} setSelectedImage={setImage} />
                    <button onClick={() => submit()}>Submit</button>
                </div>

            </div>
        </div>
    </div>);



}


export default UpsertProductComponent;
