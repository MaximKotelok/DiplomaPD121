import React, { useState, useEffect } from 'react';
import ProductFilterItemComponent from '../ProductFilterItemComponent/ProductFilterItemComponent';

const ProductFilterComponent = ({ products, setProducts }) => {
    const [filters, setFilters] = useState({});
    const [availableAttributes, setAvailableAttributes] = useState({});
    useEffect(() => {
        const attributes = [];
        products.forEach(product => {
            product.properties.forEach(property => {
                const { name, value } = property;
                if (name && value) {
                    const attributeName = name || '';
                    const attributeValue = value;
                    if (!attributes[attributeName]) {
                        attributes[attributeName] = [];
                    }
                    if (!attributes[attributeName].includes(attributeValue)) {
                        attributes[attributeName].push(attributeValue);
                    }
                }
            });
        });

        setAvailableAttributes(attributes); // Оновлюємо стан availableAttributes
    }, [products]);

    useEffect(() => {
        if (Object.keys(filters).length != 0) {

            let productForFilter = [...products];
            
            Object.keys(filters).forEach(a => {
                if(filters[a].length === 0)
                    return;
                productForFilter = productForFilter.filter(b => {
                    
                    return b.properties.some(c => filters[a].findIndex(a=>a===c.value) !== -1);
                })

            });

            setProducts(productForFilter);
        } else {
            setProducts(products);
        }

    }, [filters]);

    const handleFilterChange = (attributeName, selectedValue, isDelete = false) => {
        
        if (Object.keys(filters).indexOf(attributeName) === -1) {                        
            setFilters(prevFilters => ({
                ...prevFilters,
                [attributeName]: [selectedValue],
            }));
        } else {                        
            if (filters[attributeName].indexOf(selectedValue) === -1) {                                
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [attributeName]: [...filters[attributeName], selectedValue],
                }));
            } else if (!isDelete) {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [attributeName]: filters[attributeName].filter(a => a !== selectedValue),
                }));
            }
        }


    };



    return (
        <div>
            {Object.keys(availableAttributes).map(attributeName => (
                <div key={attributeName}>
                    <p>{attributeName}</p>
                    {availableAttributes[attributeName]?.map(value => {
                        let state = (filters[attributeName] && filters[attributeName].indexOf(value) !== -1);
                        
                        return (
                        <ProductFilterItemComponent
                            key={value}
                            name={value}
                            state={state}
                            setState={(state)=>{handleFilterChange(attributeName,value,!state)}}
                        />
                    )
                    })}
                    {/* <span>{attributeName}:</span>
                    <select
                        value={filters[attributeName] || ''}
                        onChange={e => handleFilterChange(attributeName, e.target.value || null)}
                    >
                        <option value="">All</option>
                        {availableAttributes[attributeName]?.map(value => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select> */}
                </div>
            ))}
        </div>
    );
};

export default ProductFilterComponent;
