import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLocation, setupLocation } from '../../../utils/Location';
import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../utils/Cookies"
import { useParams } from 'react-router';
import  MapPharmacies from "../../MapPharmacies/MapPharmacies"
import MapProduct  from "../../MapProducts/MapProducts"

export const Map = (props) => {
    const { id } = useParams();

    return (
        <div>
            {id !== null ? (
                <MapPharmacies></MapPharmacies>
            ) : (
                <MapProduct id={id}></MapProduct>
            )}
        </div>
    );
};