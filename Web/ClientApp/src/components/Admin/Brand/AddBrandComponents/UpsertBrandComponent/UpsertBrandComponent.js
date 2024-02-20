import 'react-quill/dist/quill.snow.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';

import { postPhotoToServer } from "../../../../../services/photo"
import { getBrandById, upsertBrand } from "../../../../../services/brand"
import { getAllCountries } from "../../../../../services/country"


import { StateInfos, Success, LayoutProviderValues } from '../../../../../utils/Constants';


import InputForBrandComponent from '../InputForBrandComponent/InputForBrandComponent'
import CustomSelectComponent from '../CustomSelectComponent/CustomSelectComponent'
import ImageUploaderComponent from '../ImageUploaderComponent/ImageUploaderComponent'


import "./UpsertBrandComponent.css"
import LayoutContext from '../../../../../layouts/LayoutContext';

const UpsertBrandComponent = () => {
    const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);    
    const { brandId } = useParams();


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
        if (brandId)
            onComponentMount(LayoutProviderValues.UPDATE); 
        else
            onComponentMount(LayoutProviderValues.ADD);

    }, [onComponentMount, onComponentUnmount]);

    const [dataFromServer, setDataFromServer] = useState({
        countries: [],
    });

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        id: undefined,
        name: undefined,
        description: undefined,
        countryID: undefined,
        pathToPhoto: undefined,
    });
    console.log(formData)
     

    async function init() {
        let tmpObject,
            tmpCountries;

        try {
            if (brandId) {
                tmpObject = await getBrandById(brandId)
                if(tmpObject.status === Success)
                    setFormData(tmpObject.data);
            }

            tmpCountries = await getAllCountries();

            if (
                tmpCountries.status === Success
            ) {

                setDataFromServer({
                    countries: tmpCountries.data,
                })

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
    }, [])


    const setFormDataAttribute = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleInputChange = (e) => {
        setFormDataAttribute(e.target.name, e.target.value);

    };

    const submit = async () => {
        let path = "";
        if (image) {
            if (formData.pathToPhoto)
                path = await postPhotoToServer("Photo/Update", formData.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""), image);
            else
                path = await postPhotoToServer("Photo/Add", "brand", image);
            if(path.status === Success){

                path = `/images/brand/${path.data}`;
            }
        } else if (formData.pathToPhoto) {
            path = formData.pathToPhoto;
        }

        


        formData["pathToPhoto"] = path;

        upsertBrand(formData);
    }

    

    if (stateInfo == StateInfos.LOADING)
        return <div>Loading</div>

    return (
        <div className='row add-product-main-container'>
            <div className='add-product-left-container'>
                <div className='inner-add-product-left-container'>

                    
                </div>
            </div>

            <div className='add-product-right-container'>
                <div className='flip'>
                    <InputForBrandComponent
                        className="margin-bottom"
                        label="Назва бренду"
                        placeholder='Введіть назву бренду'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <InputForBrandComponent
                        className="margin-bottom"
                        label="Короткий опис"
                        placeholder='Введіть короткий опис'
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <div className="margin-bottom select-div">
                        <CustomSelectComponent
                            selectedId={formData.countryBrandID}
                            className='me-1'
                            name="countryBrandID"
                            placeholder="Країна"
                            options={dataFromServer.countries &&
                                dataFromServer.countries.map &&
                                dataFromServer.countries.map(item => ({ value: item.id, label: item.name }))}
                            onChange={selectedOption => {
                                setFormData({
                                    ...formData,
                                    countryID: selectedOption.value
                                })
                            }}
                        />
                    </div>
                    <div className="margin-bottom">
                        <p className='product-label'>Оберіть фото</p>
                        <ImageUploaderComponent imageUrl={formData.pathToPhoto} selectedImage={image} setSelectedImage={setImage} />
                        <button onClick={() => submit()}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    )

}


export default UpsertBrandComponent;
