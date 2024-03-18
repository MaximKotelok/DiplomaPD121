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

  const setAdditionalComponent = (component) => {    
    setAdditonalComponent(component)
  };

  const clearAdditionalComponent = () => {
    setAdditonalComponent(null)
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
