import React, { useState, useEffect } from 'react';

const ProductFilterComponent = ({ products }) => {
    const [filters, setFilters] = useState({});
    const [availableAttributes, setAvailableAttributes] = useState({});

    useEffect(() => {
        const attributes = {};
        products.forEach(product => {
            product.Properties.forEach(property => {
                const { Attribute, Value } = property;
                if (Attribute && Value) {
                    const attributeName = Attribute.Name || '';
                    const attributeValue = Value;
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
        setFilters({});
    }, [products]);

    const handleFilterChange = (attributeName, selectedValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [attributeName]: selectedValue,
        }));
    };

    return (
        <div>
            {Object.keys(filters).map(attributeName => (
                <div key={attributeName}>
                    <span>{attributeName}:</span>
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
                    </select>
                </div>
            ))}
        </div>
    );
};

export default ProductFilterComponent;
