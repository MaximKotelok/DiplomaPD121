import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './ProductsListComponent.css';
import ProductCardComponent from '../ProductCard/ProductCardComponent.js';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductsListComponent =
    ({
        caption,
        products,
        displayCount=4
    }) => {

        // return (
        //     <Carousel 
        //     autoPlay={false} 
        //     showStatus={false} 
        //     centerMode
        //     centerSlidePercentage={100 / displayCount}
        //     >
             
        //             <ProductCardComponent></ProductCardComponent>
        //             <ProductCardComponent></ProductCardComponent>
        //             <ProductCardComponent></ProductCardComponent>
        //             <ProductCardComponent></ProductCardComponent>
        //         <ProductCardComponent></ProductCardComponent>
        //         <ProductCardComponent></ProductCardComponent>
        //         <ProductCardComponent></ProductCardComponent>
        //         <ProductCardComponent></ProductCardComponent>
             
        //     </Carousel>

        // );

        return (<div>
            <p className='caption'>{caption}</p>
            {
                products.map(a => <ProductCardComponent
                        key={a.id}
                        id={a.id}
                        title={a.title}
                        description={a.shortDescription}
                        minPrice={a.minPrice}
                        countOfPharmacies={a.count}
                        manufacturer={a.manufacturer}
                        imageUrl={a.pathToPhoto}
                    />
                )
            }
        </div>)
    };

export default ProductsListComponent;
