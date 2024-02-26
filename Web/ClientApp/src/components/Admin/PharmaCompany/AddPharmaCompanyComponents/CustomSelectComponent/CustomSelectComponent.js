import React, { useState, useRef,useEffect } from 'react';
import Select from 'react-select';
const CustomSelectComponent = ({ placeholder, className, name, options, onChange,selectedId }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    
    const optionWithId = options.find(option => option.value === selectedId);
    
    setSelectedOption(optionWithId);
  }, [selectedId]);

  return <Select
    className={className} 
    name={name}
    placeholder={placeholder}
    options={options}
    onChange={onChange}
    value={selectedOption}
  />
};

export default CustomSelectComponent;
