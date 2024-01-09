import React from 'react';
import { Check2, Heart, HeartFill } from 'react-bootstrap-icons';
import FavoriteButton  from '../FavoriteButton/FavoriteButton.js';

import 'bootstrap/dist/css/bootstrap.css';
import './ProductsListComponent.css';
import ProductCardComponent from '../ProductCard/ProductCardComponent.js';

const ProductsListComponent =
    ({
        products
    }) => {
        
        

        return (products.map(a=>{            
            return <ProductCardComponent 
            key={a.id} 
            id={a.id} 
            title={a.title} 
            description={a.shortDescription} 
            minPrice={a.minPrice} 
            countOfPharmacies={a.count}
            manufacturer={a.manufacturer}
            />
        }
            ));
    };

export default ProductsListComponent;
