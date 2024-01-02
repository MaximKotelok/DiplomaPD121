import 'leaflet/dist/leaflet.css';
import { getFromServer } from '../../utils/Queries';
import React, { useState, useEffect } from 'react';

const ConreteProductSearchComponent = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        const response = await getFromServer(`ConcreteProduct/Search/${props.pharmacyId}/${value}`);

        if (Array.isArray(response.data)) {
            setProducts(response.data);
        } else {
            setProducts([]);
        }
    };

    return (
        <div>
            <label htmlFor="myInput">Search of Product:</label>
            <input
                type="text"
                id="myInput"
                value={inputValue}
                onChange={handleInputChange}
            />
            <ul>
                {Array.isArray(products) && products.map(product => (
                    <li key={product.id}>{product.product.title},{product.price}</li>
                ))}
            </ul>
        </div>
    );
};
export default ConreteProductSearchComponent;