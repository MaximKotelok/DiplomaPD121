import React, { useState } from "react";
import LayoutContext from "./LayoutContext";

const LayoutProvider = ({ children }) => {
  const [stateComponentMounted, setComponentMounted] = useState("Home");
  const [additonalComponent, setAdditonalComponent] = useState(null);

  const onComponentMount = (data) => {
    setComponentMounted(data);
  };

  const onComponentUnmount = () => {
    setComponentMounted("");
  };

  const setAdditionalComponent = (data, component) => {
    setComponentMounted(data);
    setAdditonalComponent(component)
  };

  const clearAdditionalComponent = () => {
    setComponentMounted("");
  };

  return (
    <LayoutContext.Provider
      value={{ 
        stateComponentMounted, onComponentMount, onComponentUnmount, 
        additonalComponent, setAdditionalComponent, clearAdditionalComponent
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
