import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

import './SearchComponent.css';
import SquareCardComponent from '../SquareCardComponent/SquareCardComponent';
import plus from "../../../styles/images/plus.png";


const SearchComponent = ({ searchTitle, queryFunction,parser }) => {
    const [items, setItems] = useState({});
    console.log(items)

    return (
        <div>
            <div className='container custom-search-container'>
                <div className='row search-custom'>
                    <div className='col-6'>
                        <p>{searchTitle}</p>
                    </div>
                    <div className='col-6'>
                        <div className="p-1 my-round-search">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button id="button-addon2" type="submit" className="btn btn-link text-dark"><i className="bi bi-search"></i></button>
                                </div>
                                <input onChange={async (e)=>{
                                    
                                    setItems(await queryFunction(e.target.value))}} type="search" placeholder="Пошук..." aria-describedby="button-addon2" className="form-control border-0" />
                            </div>
                        </div>
                    </div>
                </div>
            
                <div>
                <div className='row result-items'>                    
                    {items&&items.map&&items.map(a=>parser(a))}
                    <SquareCardComponent image={plus} imageHeight={60} imageWidth={60}/>
                </div>
            </div>
            </div>
        </div>
    )

}


export default SearchComponent;
