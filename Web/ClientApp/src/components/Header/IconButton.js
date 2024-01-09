import React from 'react';

const IconButton = ({ iconPath, text, onClick }) => {
    return (
        <button className="btn d-flex align-items-center">
            <img src={iconPath} alt="Icon" className="mr-2" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            <span className="text-center flex-grow-1">{text}</span>
        </button>
    );
};

export default IconButton;
