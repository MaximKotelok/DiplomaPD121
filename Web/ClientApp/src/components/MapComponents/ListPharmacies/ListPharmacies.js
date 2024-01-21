import ConreteProductSearchComponent from "../ConreteProductSearchComponent/ConreteProductSearchComponent"

import "./ListPharmacies.css"

const ListPharmacies = (props) => {
    return (
        <div className="map-left">
            <h1>Pharmacies in {props.city}</h1>
            <ul>
                {props.townPharmacy.map(pharmacy => (
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