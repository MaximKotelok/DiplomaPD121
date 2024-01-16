import React, { useEffect, useLayoutEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './ProductsListComponent.css';
import ProductCardComponent from '../../ProductCard/ProductCardComponent.js';

import Carousel from "nuka-carousel"
import MiniProductCardComponent from '../MiniProductCard/MiniProductCardComponent.js';

import { isWidthDown } from '../../../utils/Functions.js';

const ProductsListComponent =
    ({      
        products,
        mdDisplayCount = 2,
        lgDisplayCount = 3,
        xlDisplayCount = 4
    }) => {
        const [count, setCount] = useState(1);
        useLayoutEffect(() => {
            function updateSize() {
                let width = window.innerWidth;

                if (isWidthDown("md", width)) {
                    setCount(mdDisplayCount);
                }
                else if (isWidthDown("lg", width)) {
                    setCount(lgDisplayCount);
                } else {
                    setCount(xlDisplayCount);
                }
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);


        return (
            <>    
                <Carousel cellAlign="left" slidesToShow={count}>
                    {products&&products.map?products.map((a) => (
                        <MiniProductCardComponent
                            key={a.id}
                            id={a.id}
                            title={a.title}
                            description={a.shortDescription}
                            minPrice={a.minPrice}
                            countOfPharmacies={a.count}
                            manufacturer={a.manufacturer}
                            imageUrl={a.pathToPhoto}
                        />
                    )):new Array(15).fill(null).map((_, index) => (
                        <MiniProductCardComponent key={index}/>))
                        }
                </Carousel>
            </>
        );
    };

export default ProductsListComponent;
