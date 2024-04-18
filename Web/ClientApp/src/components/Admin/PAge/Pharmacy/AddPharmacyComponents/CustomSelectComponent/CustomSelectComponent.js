import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
const CustomSelectComponent = ({
  placeholder,
  className,
  name,
  options,
  onChange,
  selectedId,
}) => {
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
    // control: (provided, state) => ({
    //   ...provided,
    //   border: state.isFocused
    //     ? "2px solid rgba(172, 172, 172, 1)"
    //     : "2px solid red",
    // }),
    // dropdownIndicator: (provided, state) => ({
    //   ...provided,
    //   color: state.isFocused ? "rgba(172, 172, 172, 1)" : "red",
    // }),
  };

  useEffect(() => {
    const optionWithId = options.find((option) => option.value === selectedId);

    setSelectedOption(optionWithId);
  }, [selectedId]);

  return (
    <Select
      className={className}
      name={name}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={selectedOption}
      styles={customStyles}
    />
  );
};

export default CustomSelectComponent;
