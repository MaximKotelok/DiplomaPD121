import React, { useState } from 'react';

import CustomSelectComponent from '../CustomSelectComponent/CustomSelectComponent';

const TypeAndCategoryComboboxComponent = ({ categories, types, typeId, categoryId, setFormData, formData
    , isTypeDisabled }) => {
        
    if (!(categories && types))
        return (<></>)

    return (
        <div className='w-50 row'>
            <div className='col-6'>
                <CustomSelectComponent
                    className="w-100 mx-1"
                    selectedId={categoryId}
                    name="category"
                    options={categories.map(item => ({ value: item.id, label: item.title }))}
                    onChange={a => { setFormData({ ...formData, categoryID: a.value }); }}
                    placeholder="Категорія товару"
                    isSearchable={true}
                />

            </div>
            <div className='col-6'>
                <CustomSelectComponent
                    className="w-100 mx-1"
                    selectedId={typeId}
                    name="productAttributeGroupID"
                    options={types.map(item => ({ value: item.id, label: item.name }))}
                    isDisabled={isTypeDisabled}
                    onChange={a => setFormData({ ...formData, productAttributeGroupID: a.value })}
                    placeholder="Тип товару"
                    isSearchable={true}
                />
            </div>
        </div>
    )
}


export default TypeAndCategoryComboboxComponent;
