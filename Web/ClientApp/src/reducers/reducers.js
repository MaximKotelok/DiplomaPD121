
import { createSlice } from '@reduxjs/toolkit';
import { StateInfos } from '../utils/Constants';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loader: StateInfos.LOADING
  },
  reducers: {
    reloadCart: (state, action) => {      
      state.cart = action.payload;
    },
    initCart: (state, action) => {
      state.cart = action.payload;
      state.loader = StateInfos.LOADED
    },
  },
});

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: {
    catalogue: []
  },
  reducers: {
    addCategory: (state, action) => {      
      state.catalogue.push(action.payload)
    },
  },
});


export const { reloadCart, initCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const { addCategory } = catalogueSlice.actions;
export const catalogueReducer = catalogueSlice.reducer;
