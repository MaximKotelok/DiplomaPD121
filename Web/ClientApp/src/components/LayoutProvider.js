import React, { useState } from 'react';
import LayoutContext from './LayoutContext';

const LayoutProvider = ({ children }) => {
  const [stateComponentMounted, setComponentMounted] = useState("Home");

  const onComponentMount = (data) => {
    setComponentMounted(data);
  };

  const onComponentUnmount = () => {
    setComponentMounted("");
  };

  return (
    <LayoutContext.Provider value={{ stateComponentMounted, onComponentMount, onComponentUnmount }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
