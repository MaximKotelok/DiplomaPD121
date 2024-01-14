import { getFromServer } from '../../utils/Queries';
import React, { useState, useEffect } from 'react';/
import ConreteProductSearchComponent from "./ConreteProductSearchComponent"

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
                        style={{
                            border: '2px solid #000',
                            padding: '10px',
                            color: props.selectedPharmacy && props.selectedPharmacy.id === pharmacy.id ? 'red' : 'black'
                        }}
                        onClick={() => { 
                            props.onPharmacyClick(pharmacy)
                            if (props.onMapSelect) {
                                props.onMapSelect(pharmacy);
                            }
                        }}
                    >
                        <p>{pharmacy.address}, {pharmacy.longitude},{pharmacy.latitude}</p>
                        <ConreteProductSearchComponent pharmacyId={pharmacy.id}></ConreteProductSearchComponent>
                        <button onClick={() => {
                            const mapsUrl = `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}&z=15&t=m`;
                            window.open(mapsUrl, '_blank');
                        }}>Open Map</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ListPharmacies;