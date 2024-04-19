import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
const CustomSelectComponent = ({
  placeholder,
  className,
  name,
  options,
  onChange,
  selectedId,
  isDisabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // useEffect(() => {
  //   const optionWithId = options.find((option) => option.value === selectedId);
  //   setSelectedOption(optionWithId);
  // }, [options, selectedId]);

  return (
    <Select
      className={className}
      name={name}
      placeholder={placeholder}
      // options={[{label: placeholder, value: -1, isDisabled: true},,...options]}
      // onChange={onChange}
      value={selectedOption}
      isDisabled={isDisabled}
    />
  );
};

export default CustomSelectComponent;
