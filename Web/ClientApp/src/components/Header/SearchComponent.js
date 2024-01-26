import React from 'react';
import './SearchComponent.css';
import myImage from './search.svg'; // Замініть шлях імпорту на ваш шлях до зображення

const SearchElement = () => {
    return (
        // <div className="input-group mb-3 center back-serach-bar">
        <div className="input-group  center back-serach-bar">
            <button className="social-btn" type="button" >
                <img src={myImage} width="20px"  alt="My Icon" className="icon" />
            </button>
            <input  type="text" className="my-search-bar" placeholder="пошук..." aria-label="Example text with button addon" aria-describedby="button-addon1" />
        </div>
    );
};

export default SearchElement;