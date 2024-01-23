import React, { useEffect, useState } from 'react';
import { ApiPath, GetGroupById } from '../../../utils/Constants';
import { useParams } from 'react-router-dom';
import { getFromServer } from '../../../utils/Queries';
import Select from 'react-select';
const AddProductComponent = () => {
    const { typeId } = useParams();

    const [mainInput, setMainInput] = useState([]);
    const [attributes, setAttributes] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        ManufacturerID: 1,
        BrandId: 1
    });

    const [additionalAttribute, setAdditionalAttribute] = useState({});
    const [selectedAdditionalAttribute, setSelectedAdditionalAttribute] = useState(null);
    const [displayAdditionalAttributes, setDisplayAdditionalAttributes] = useState([]);

    const [errors, setErrors] = useState({
        username: '',
        additional: ''
    });
    useEffect(() => {
        init();
    }, [])

    

    

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeMainData = (name, value) => {
        setFormData((prevData) => {
            const newData = { ...prevData };

            newData[name] = value;
            
            return newData;
        });

    }


    const handleAdditionalChange = (name, value) => {
        setAdditionalAttribute((prevData) => {
            const newData = { ...prevData };
            newData[name] = value;
            return newData;
        });
    };





    async function init() {
        try {
            let res = await getFromServer(GetGroupById, { id: typeId });
            let inputData =
                await Promise.all(res.data.existAttributes.map(async (b) => {
                    return {
                        name: b.name, description: b.description, list: (await getFromServer(b.actionGetPath))
                            .data.map(c => {
                                return { id: c.id, title: c.title }
                            }
                            )
                    };
                }));


            setMainInput(inputData);

            setAttributes(res.data.attributesInGroup);            


        } catch (error) {
            console.error("Error in init function:", error);
        }
    }

    
    return <div>
        <p>Title</p>
        <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
        ></input>
        <p>Short Description</p>
        <input
            type="text"
            name="title"
            value={formData.shortDescription}
            onChange={handleInputChange}
        ></input>

        <p>Description</p>
        <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
        ></textarea>
        {mainInput && mainInput.map &&
            mainInput.map(a => {

                if (a.list.length > 0)
                    return (
                        <div>
                            <p>{a.description}</p>
                            <Select
                                name={a.name}
                                options={a.list.map(item => ({ value: item.id, label: item.title }))}
                                onChange={selectedOption => { handleChangeMainData(a.name, selectedOption.value) }}
                                placeholder="Select..."
                                isSearchable={true}
                            />
                        </div>
                    )

            })

        }

        {attributes && attributes.map &&


            <div>
                <p>Додаткові параметри:</p>
                <Select
                    value={selectedAdditionalAttribute}
                    name="additonals"
                    options={attributes.filter(a=>{
                        return !displayAdditionalAttributes.length || !displayAdditionalAttributes.map|| !displayAdditionalAttributes.map(b=>b.id).includes(a.id)
                    }).map(item => ({ value: item.id, label: item.name }))
                    }
                    onChange={selectedOption => { setSelectedAdditionalAttribute(selectedOption) }}
                    placeholder="Select..."
                    isSearchable={true}
                />
                <button onClick={
                    a=>{
                        setSelectedAdditionalAttribute(null)
                        setDisplayAdditionalAttributes([
                            ...displayAdditionalAttributes,
                            {
                                id: selectedAdditionalAttribute.value, 
                                name: selectedAdditionalAttribute.label
                            }
                        ])
                    }
                } >+</button>

                {
                   displayAdditionalAttributes&&displayAdditionalAttributes.map(
                    a=>{

                        return <>
                            <p>{a.name}</p>
                            <input name={a.id} type="text" onChange={e=>{
                                handleAdditionalChange(a.id, e.target.value)
                            }} />


                        </>
                    }

                   )
                }
            </div>

        }


        <div className='add-product-right-container'>

        </div>
    </div>


}


export default AddProductComponent;
