import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import "./Details.css";

import { addToRecentlyViewedProduct } from '../../../../utils/SessionStorage';
import { Description } from './Component/DescriptionComponent/Description';
import { ApiPath, GetProduct, PhotoPath, StateInfos, Success } from '../../../../utils/Constants';
import DescriptionCategoryPathComponent from './Component/CategoryPathDetailsComponent/CategoryPathDetailsComponent';
import { CharacteristicComponent } from './Component/CharacteristicComponent/CharacteristicComponent';
import { CharacteristicTableComponent } from './Component/CharacteristicTableComponent/CharacteristicTableComponent';
import AccordionComponent from '../../../Common/AccordionQuestionComponent/accordionComponent';
import HeadOfDetailsComponent from './Component/HeadOfDetailsComponent/HeadOfDetailsComponent';
import { getCookie } from '../../../../utils/Cookies';
import { getPathToCategory } from '../../../../services/category';
import { getProductById } from '../../../../services/product';



export const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loader, setLoader] = useState(StateInfos.LOADING);

    addToRecentlyViewedProduct(id);
    useEffect(() => {
        init();
    }, [])
    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [location,])

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const targetElement = document.querySelector(hash);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loader])

    async function init() {
        const res = await getProductById(id);
        if (res.status === Success) {
            let product;
            console.log(res)
            if (res.data.product) {
                product = res.data.product;
                product.properties.unshift({ name: "Діюча Речовина", value: res.data.activeSubstance })
            }
            else {
                product = res.data;
            }
            console.log(product)
            let path = await getPathToCategory(product.categoryID);
            if (path.status === Success) {
                product.city = getCookie("city")
                product.pathToPhoto = `${ApiPath}${product.pathToPhoto}`
                product.from = 23.66
                product.to = 38.60
                product.pathToCategory = path.data;                                
                product.properties.unshift({ name: "Категорія", value: path.data.slice(-1)[0].title });
                setProduct(product)
                setLoader(StateInfos.LOADED)

            } else {
                setLoader(StateInfos.ERROR)
            }


        } else {
            setLoader(StateInfos.ERROR)
        }

    }
    useEffect(()=>{
        if(loader === StateInfos.ERROR){
            window.location.href = "/404"
        }
    },[loader])

    if (loader != StateInfos.LOADED){
        return <div>Loading...</div>
    }


    return (<div>    
        <DescriptionCategoryPathComponent data={product.pathToCategory} />

        <HeadOfDetailsComponent product={product} />


        <div className='row'>
            <p className='section-title'>Характеристики</p>
            <CharacteristicComponent
                data={
                    product.properties
                }
            />
        </div>


        <div className='row' id="instruction">
            <p className='section-title'>Опис</p>
            <Description
                separeteBy={product.description.includes("h1") ? "h1" : ""}
            >{product.description}</Description>
        </div>
        <hr />

        <div className='row'>
            <p className='section-title' id='characteristic'>Характеристики</p>
            <CharacteristicTableComponent
                data={
                    product.properties.map(a => { return { name: a.name, value: a.value } })
                }
            />
        </div>

        <div className="row">
            <p className='section-title' id='questions'>Часті питання</p>
            <div className="col-12 col-md-6">
                <AccordionComponent />
            </div>

            <div className="col-12 col-md-6"></div>
        </div>
    </div>);
}
