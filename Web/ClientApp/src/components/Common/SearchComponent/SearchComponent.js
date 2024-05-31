import React from 'react';
import './SearchComponent.css';
import searchIcon from "../../../assets/images/header-icons/search-icon.svg"; // Замініть шлях імпорту на ваш шлях до зображення

const SearchComponent = ({value, className,onClick, callback}) => {
    return (
        // <div className="input-group mb-3 center back-serach-bar">
        <div className={`input-group  center back-serach-bar ${className}`}>
            <button className="social-btn" type="button" onClick={()=>{if(onClick)onClick();}}>
                <img src={searchIcon} width="28px" height="28px"  alt="My Icon" className="icon" />
            </button>
            <input 
            value={value}
            onChange={(e)=>{callback(e.target.value);}}
            type="text" className="my-search-bar" placeholder="Пошук..." aria-label="Example text with button addon" aria-describedby="button-addon1" />
        </div>
    );
};

export default SearchComponent;