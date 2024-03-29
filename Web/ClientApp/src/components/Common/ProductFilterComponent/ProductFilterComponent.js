import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProductFilterItemComponent from '../ProductFilterItemComponent/ProductFilterItemComponent';
import ProductFilterItemGroupComponent from '../ProductFilterItemGroupComponent/ProductFilterItemGroupComponent';

import styles from "./ProductFilterComponent.module.css";
import ProductFilterChoosenComponent from '../ProductFilterChoosenComponent/ProductFilterChoosenComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import { GetSearchInput, Search } from '../../../services/product';
import { Success } from '../../../utils/Constants';
const ProductFilterComponent = ({ products, setProducts }) => {
    const { title, categoryId, brandId, extraParamId, extraParamValue } = useParams();

    const [filters, setFilters] = useState({});
    const [availableAttributes, setAvailableAttributes] = useState({});    
    const [filteredAttributes, setFilteredAttributes] = useState({});    
    const [categories, setCategories] = useState([]);    
    const [brands, setBrands] = useState([]);    
    const [searchByTitle, setSearchByTitle] = useState("");

    useEffect(()=>{
        init();        
    },[title, categoryId, brandId, extraParamId, extraParamValue]);

    async function init(){
        
        let res = await GetSearchInput(
                title, 
                categoryId?[categoryId]:null, 
                brandId?[brandId]:null, 
                extraParamId&&extraParamValue?[{id:extraParamId, name:extraParamValue}]:null);


        if(res.status === Success){
            if(!categoryId){
                setCategories(res.data.categories);                
            }else{
                setFilters({...filters, categories:[{value:categoryId, isHidden:true}]})
            }
            if(!brandId){
                setBrands(res.data.brands);
            }else{
                setFilters({...filters, brands:[{value:brandId, isHidden:true}]})
            }
            
            setAvailableAttributes(res.data.attributes);
            setFilteredAttributes(res.data.attributes);
        }
    }

    function convertToServerModel(key, array) {
        const outputArray = [];
        
        for (let item in array) {
            outputArray.push({name:key, value:array[item].value});
        }
    
        return outputArray;
    }
console.log(filters)
    async function submit(){
        let clone = {...filters};    
        let categories = clone.categories?Object.keys(clone.categories).map(a=>parseInt(clone.categories[a].value)):[];
        let brands = clone.brands?Object.keys(clone.brands).map(a=>parseInt(clone.brands[a].value)):[];
        delete clone.categories;
        delete clone.brands;
        // let model = {
        //     title: searchByTitle,
        //     categories: categories,
        //     brands: brands,
        //     properties:             
        //     [].concat(...Object.keys(clone)
        //         .map(a=>convertToServerModel(a,clone[a]))
        //     )
        //     ,
        // }

        console.log(categories)
        console.log(brands)
        let searchResult = await Search(
            searchByTitle, 
            categories, 
            brands, 
            [].concat(...Object.keys(clone)
                .map(a=>convertToServerModel(a,clone[a]))
            )
        );
        if(searchResult.status === Success)
            setProducts(searchResult.data);

    }
    
    const handleFilterChange = (attributeName, selectedValue, isDelete = false, displayedName = "") => {
        if (Object.keys(filters).indexOf(attributeName) === -1) {                        
            setFilters(prevFilters => ({
                ...prevFilters,
                [attributeName]: [{value: selectedValue, displayedName: displayedName?displayedName:selectedValue}],
            }));
        } else {                        
            if (filters[attributeName].findIndex(a=>a.value === selectedValue) === -1) {   
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [attributeName]: [...filters[attributeName], {value: selectedValue, displayedName: displayedName?displayedName:selectedValue}],
                }));
            } else if (!isDelete) {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [attributeName]: filters[attributeName].filter(a => a.value !== selectedValue),
                }));
            }
        }

    };



    return (
        <div className={styles["card"]}>
            {Object.keys(filters).map(attributeName =>{
                return filters[attributeName].filter(a=>!a.isHidden).map(a=>{
                    return <ProductFilterChoosenComponent name={a.displayedName} 
                    remove={()=>handleFilterChange(attributeName,a.value,false)}/>
                });
                
            })}

            <SearchComponent onClick={submit} callback={setSearchByTitle} className={styles["search"]}/>
            
            {(Object.keys(categories).length>0 && <ProductFilterItemGroupComponent title="Категорія">                    
                    {Object.keys(categories).map(key => {
                        let state = (filters["categories"] && filters["categories"].
                            findIndex(a=>a.value===key) !== -1);
                        
                        return (
                        <ProductFilterItemComponent
                            key={key}
                            name={categories[key]}
                            state={state}
                            setState={(state)=>{handleFilterChange("categories",key,!state, categories[key])}}
                        />
                    )
                    })
                    }
                    </ProductFilterItemGroupComponent>
            )}
            {(Object.keys(brands).length>0 && <ProductFilterItemGroupComponent title="Бренд">                    
                    {Object.keys(brands).map(key => {
                        let state = (filters["brands"] && filters["brands"].
                            findIndex(a=>a.value===key) !== -1);
                        
                        return (
                        <ProductFilterItemComponent
                            key={key}
                            name={brands[key]}
                            state={state}
                            setState={(state)=>{handleFilterChange("brands",key,!state, brands[key])}}
                        />
                    )
                    })
                    }
                    </ProductFilterItemGroupComponent>
                    )}

            {Object.keys(filteredAttributes).map(attributeName => (
                <div key={attributeName}>                    
                    <ProductFilterItemGroupComponent title={attributeName}>                    
                    {availableAttributes[attributeName]?.map(value => {
                        let state = (filters[attributeName] && filters[attributeName].
                        findIndex(a=>a.value===value) !== -1);
                        
                        return (
                        <ProductFilterItemComponent
                            key={value}
                            name={value}
                            state={state}
                            setState={(state)=>{handleFilterChange(attributeName,value,!state)}}
                        />
                    )
                    })
                    }
                    </ProductFilterItemGroupComponent>
                    
                    {/* <span>{attributeName}:</span>
                    <select
                        value={filters[attributeName] || ''}
                        onChange={e => handleFilterChange(attributeName, e.target.value || null)}
                    >
                        <option value="">All</option>
                        {availableAttributes[attributeName]?.map(value => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select> */}
                </div>
            ))}
        </div>
    );
};

export default ProductFilterComponent;
