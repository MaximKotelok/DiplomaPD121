
import { configureStore } from '@reduxjs/toolkit';
import { favouriteReducer } from '../reducers';

const favouriteStore = configureStore({
    reducer: {
        favoutire: favouriteReducer 
    },
  });

export default favouriteStore;
