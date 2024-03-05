import ConreteProductSearchComponent from "../ConreteProductSearchComponent/ConreteProductSearchComponent"
import ListPharmaciesItemComponent from "../ListPharmaciesItemComponent/ListProductItemComponent";

import styles from "./ListPharmacies.module.css"

const ListPharmacies = (props) => {
    console.log(props.townPharmacy)
    return (
        <div className="map-left p-3">
            <h1 className={`${styles["header-text"]}`}>Аптеки у місті {props.city}</h1>
            
                {props.townPharmacy.map(pharmacy => (
                    <ListPharmaciesItemComponent 
                    key={pharmacy.id} 
                    id={pharmacy.id}
                    onClick={() => { 
                        props.onPharmacyClick(pharmacy)
                        if (props.onMapSelect) {
                            props.onMapSelect(pharmacy);
                        }
                    }}
                    lon={pharmacy.longitude}
                    lat={pharmacy.latitude}
                    address={pharmacy.address}
                    title={pharmacy.pharmaCompany.title}
                    timeOpen={pharmacy.openTime}
                    timeClosed={pharmacy.closeTime}
                    isSelected={props.selectedPharmacy && props.selectedPharmacy.id === pharmacy.id}
                    />

                ))}
            
        </div>
    );
};
export default ListPharmacies;