import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProductFilterItemComponent from '../ProductFilterItemComponent/ProductFilterItemComponent';
import ProductFilterItemGroupComponent from '../ProductFilterItemGroupComponent/ProductFilterItemGroupComponent';
import nextImg from '../../../assets/images/search/next.svg';
import prevImg from '../../../assets/images/search/prev.svg';



import styles from "./PaginationComponent.module.css";
import ProductFilterChoosenComponent from '../ProductFilterChoosenComponent/ProductFilterChoosenComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import { GetSearchInput, Search } from '../../../services/product';
import { Success } from '../../../utils/Constants';
const PaginationComponent = ({ setContent, getContent, allowAppend, page=1, setPage, countOfPages=1 }) => {    

    async function showMoreClickHandle(){
        if(page === countOfPages)
            return;
        let result = await getContent(page+1);
        if(result){
            setPage(page+1);
            setContent((prevValue)=>{                
               return [...prevValue,...result];
            
            });
        }   
    }
    async function prevPageClickHandle(){
        if(page === 1)
            return;
        let result = await getContent(page-1);
        if(result){
            setPage(page-1);
            setContent(result);
        }   
    }
    async function nextPageClickHandle(){
        console.log("a")
        if(page === countOfPages)
            return;
        let result = await getContent(page+1);
        if(result){
            setPage(page+1);
            console.log(result);
            setContent(result);
        }   
    }

    return (
        <div className='container-fluid'>
            <div className='row  my-3'>
                <div className='col-10 p-0'>
                    {allowAppend&&(
                        <button                         
                        className={`w-100 btn btn-outline-primary ${page === countOfPages && `opacity-50 ${styles["disabled"]}`}`}
                        onClick={showMoreClickHandle}
                        >Показати ще</button>
                    )}
                </div>
                <div className='col-2 d-flex justify-content-end align-items-center pe-0'>
                    <span className={`${styles["pages"]}`}>
                        {`${page} з ${countOfPages}`}
                    </span>
                    <div>
                        <img onClick={prevPageClickHandle} src={prevImg} role="button" className={(page === 1 && `opacity-50 ${styles["disabled"]}`)}/>
                        <img onClick={nextPageClickHandle} src={nextImg} role="button" className={(page === countOfPages && `opacity-50 ${styles["disabled"]}`)}/>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default PaginationComponent;
