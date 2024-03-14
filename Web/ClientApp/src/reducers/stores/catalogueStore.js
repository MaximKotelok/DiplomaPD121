
import { configureStore } from '@reduxjs/toolkit';
import { catalogueReducer } from '../reducers';

const catalogueStore = configureStore({
    reducer: {
      catalogue: catalogueReducer 
    },
  });

export default catalogueStore;
