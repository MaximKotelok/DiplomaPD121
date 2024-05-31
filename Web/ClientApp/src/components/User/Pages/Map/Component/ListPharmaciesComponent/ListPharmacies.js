import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ConreteProductSearchComponent from "../ConreteProductSearchComponent/ConreteProductSearchComponent";
import ListPharmaciesItemComponent from "../ListPharmaciesItemComponent/ListProductItemComponent";

import styles from "./ListPharmacies.module.css";
import useWindowSize from '../../../Profile/UseWindowSize';
import CarouselListWithoutNavsComponent from '../../../../Common/CarouselListWithoutNavsComponent/CarouselListWithoutNavsComponent';

const ListPharmacies = (props) => {
    const { pharmacyId } = useParams();
    const { width } = useWindowSize();
    const isIpad = width <= 1200 && width >= 768;

    useEffect(() => {
        if (pharmacyId && props.townPharmacy) {
            let pharmacy = props.townPharmacy.find(a => a.id == pharmacyId);
            props.onPharmacyClick(pharmacy);
            if (props.onMapSelect) {
                props.onMapSelect(pharmacy);
            }
        }
    }, [pharmacyId, props.townPharmacy]);

    return (
        <div className="map-left p-3">
            <h1 className={`${styles["header-text"]}`}>Аптеки у місті {props.city}</h1>

            {isIpad ? (
                <CarouselListWithoutNavsComponent
                    mdDisplayCount={1.2}
                    xlDisplayCount={1.5}
                >
                    {props.townPharmacy.map(pharmacy => (
                        <ListPharmaciesItemComponent
                            className="me-2"
                            key={pharmacy.id}
                            id={pharmacy.id}
                            onClick={() => {
                                props.onPharmacyClick(pharmacy);
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
                </CarouselListWithoutNavsComponent>
            ) : (
                props.townPharmacy.map(pharmacy => (
                    <ListPharmaciesItemComponent
                        key={pharmacy.id}
                        id={pharmacy.id}
                        onClick={() => {
                            props.onPharmacyClick(pharmacy);
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
                ))
            )}
        </div>
    );
};

export default ListPharmacies;
