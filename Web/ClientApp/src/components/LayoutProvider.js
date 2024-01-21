import React, { useState } from 'react';
import LayoutContext from './LayoutContext';

const LayoutProvider = ({ children }) => {
  const [isComponentMounted, setComponentMounted] = useState(false);

  const onComponentMount = () => {
    setComponentMounted(true);
  };

  const onComponentUnmount = () => {
    setComponentMounted(false);
  };

  return (
    <LayoutContext.Provider value={{ isComponentMounted, onComponentMount, onComponentUnmount }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
