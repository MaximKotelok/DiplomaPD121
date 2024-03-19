import React, { useState, useEffect, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useParams } from 'react-router';
import "./Map.css"

import MapPharmacies from "./Component/MapPharmaciesComponent/MapPharmacies"
import MapProduct from "./Component/MapProductsComponent/MapProducts"

import LayoutContext from '../../../../layouts/LayoutContext';
import { NavigationDetailsComponent } from '../../Common/NavigationDetailsComponent/NavigationDetailsComponent';
import { getCookie } from '../../../../utils/Cookies';

export const Map = (props) => {
    const { id,city } = useParams();
    const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);

    useEffect(() => {    
        onComponentMount("map");
        return () => {    
          onComponentUnmount();
        };
      }, [onComponentMount, onComponentUnmount]);

    return (
        <div className='p-2'>            {
                id != null ? (
                    <MapProduct productId={id} city={city?city:getCookie("city")}></MapProduct>
                ) : (
                    <MapPharmacies city={city?city:getCookie("city")}></MapPharmacies>
                )
            }
        </div>
    );
};