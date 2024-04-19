import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
const CustomSelectComponent = ({ placeholder, className, name, options, onChange, selectedId, isDisabled = false }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "rgba(236, 245, 255, 1)",
            border: "1px solid rgba(0, 122, 255, 1) !important",
            borderRadius: "10px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "transparent" : "transparent",
            color: state.isSelected ? "rgba(0, 122, 255, 1)" : "rgba(0, 0, 0, 0.85)",
            "&:hover": {
                backgroundColor: "rgba(236, 245, 255, 1)",
            },
            cursor: "pointer",
        }),

    };

    useEffect(() => {

        const optionWithId = options.find(option => option.value === selectedId);
        setSelectedOption(optionWithId);
    }, [options, selectedId]);

    return <Select
        className={className}
        name={name}
        placeholder={placeholder}
        options={[{ label: placeholder, value: -1, isDisabled: true }, , ...options]}
        onChange={onChange}
        value={selectedOption}
        isDisabled={isDisabled}
        styles={customStyles}
    />
};

export default CustomSelectComponent;
