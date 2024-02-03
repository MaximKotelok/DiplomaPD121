import React, { useState, useRef } from 'react';

import "./InputForProductComponent.css"



const InputForProductComponent = ({label, type, name, value = '', onChange, placeholder="...", className, error}) => {
  
    const [text, setText]= useState("")
  return (
        <div className={`${className}`}>
            {label&&<p className='product-label'>{label}</p>}
            <input className='product-add-input form-control' placeholder={placeholder} type={type} name={name} onChange={e=>{onChange(e);setText(e.target.value)}} value={value?value:text}/>
            {(error&&<p className='text-danger'>{error}</p>)}
        </div>
        );
};

export default InputForProductComponent;
