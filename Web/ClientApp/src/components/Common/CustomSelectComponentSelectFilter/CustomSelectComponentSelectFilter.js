import React, { useState, useRef, useEffect } from "react";
import Select, { StylesConfig } from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "transparent",
      color: isDisabled
        ? undefined
        : isSelected
        ? "rgba(255, 149, 0, 1)"
        : isFocused
        ? "rgba(13, 30, 49, 1)"
        : undefined,
      cursor: "pointer",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "transparent"
            : "transparent"
          : undefined,
        color: !isDisabled
          ? isSelected
            ? "rgba(255, 149, 0, 1)"
            : "rgba(255, 149, 0, 1)"
          : undefined,
      },
      ":hover": {
        color: !isDisabled ? "rgba(255, 149, 0, 1)" : undefined,
      },
    };
  },
};

const CustomSelectComponentSelectFilter = ({
  placeholder,
  className,
  name,
  options,
  onChange,
  selectedId,
  isDisabled = false,
}) => {
  // Статичні опції
  return (
    <Select
      className={`react-select-container ${className}`}
      classNamePrefix="react-select"
      name={name}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={options.find(a=>a.id==selectedId)}
      isDisabled={isDisabled}
      styles={colourStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "red",
          primary: "transper",
        },
      })}
    />
  );
};

export default CustomSelectComponentSelectFilter;
