import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './ProductsListComponent.css';
import ProductCardComponent from '../ProductCard/ProductCardComponent.js';

const ProductsListComponent =
    ({
        caption,
        products
    }) => {



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
