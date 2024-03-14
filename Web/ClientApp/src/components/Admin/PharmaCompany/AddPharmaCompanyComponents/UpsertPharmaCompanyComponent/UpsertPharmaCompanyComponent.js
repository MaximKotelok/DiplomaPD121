import 'react-quill/dist/quill.snow.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getPharmaCompanyById, upsertPharmaCompany } from "../../../../../services/pharmaCompany"
import { StateInfos, Success, LayoutProviderValues } from '../../../../../utils/Constants';
import InputForPharmaCompanyComponent from '../InputForPharmaCompanyComponent/InputForPharmaCompanyComponent'

import "./UpsertPharmaCompanyComponent.css"
import LayoutContext from '../../../../../layouts/LayoutContext';

const UpsertPharmaCompanyComponent = () => {
    const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);    
    const { companyId } = useParams();


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
        if (companyId)
            onComponentMount(LayoutProviderValues.UPDATE); 
        else
            onComponentMount(LayoutProviderValues.ADD);

    }, [onComponentMount, onComponentUnmount]);

    const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);
    const [formData, setFormData] = useState({
        id: undefined,
        title: undefined,
        description: undefined,

        username: undefined,
        email: undefined,
        password: undefined,
    });
     

    async function init() {
        let tmpObject;

        try {
            if (companyId) {
                tmpObject = await getPharmaCompanyById(companyId)
                if (tmpObject.status === Success) {
                    setFormData(tmpObject.data);
                }
                else {
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
        upsertPharmaCompany(formData);
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
                    <InputForPharmaCompanyComponent
                        className="margin-bottom"
                        label="Назва компанії"
                        placeholder='Введіть назву бренду'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <InputForPharmaCompanyComponent
                        className="margin-bottom"
                        label="Короткий опис"
                        placeholder='Введіть короткий опис'
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    {companyId == null && (
                        <div className="mt-4">
                            <h2>New Company User</h2>
                            <InputForPharmaCompanyComponent
                                className="margin-bottom"
                                label="Username"
                                placeholder='Введіть ім`я користувача'
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <InputForPharmaCompanyComponent
                                className="margin-bottom"
                                label="Email"
                                placeholder='Введіть пошту користувача'
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <InputForPharmaCompanyComponent
                                className="margin-bottom"
                                label="Password"
                                placeholder='Введіть пароль користувача'
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
    )

}


export default UpsertPharmaCompanyComponent;
