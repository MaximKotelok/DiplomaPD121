import 'leaflet/dist/leaflet.css';
import { getFromServer } from '../utils/Queries';
import React, { useState, useEffect } from 'react';

const ListPharmacies = (props) => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        const getPharmacyOfTown = async (city) => {
            try {
                let pharmacy = (await getFromServer(`Pharmacy/GetListOfPharmacyInYourCity/${city}`)).data;
                setPharmacies(pharmacy);
            } catch (error) {
                console.error('Error fetching pharmacy data:', error);
            }
        }

        console.log(props.city);
        getPharmacyOfTown(props.city);
    }, [props.city])

    return (
        <div>
            <h1>Pharmacies in {props.city}</h1>
            <ul>
                {pharmacies.map(pharmacy => (
                    <li
                        key={pharmacy.id}
                        style={{ color: props.selectedPharmacy && props.selectedPharmacy.id === pharmacy.id ? 'red' : 'black' }}
                        onClick={() => { 
                            props.onPharmacyClick(pharmacy)
                            if (props.onMapSelect) {
                                props.onMapSelect(pharmacy);
                            }
                        }}
                    >
                        {pharmacy.address}, {pharmacy.longitude},  {pharmacy.latitude}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ListPharmacies;