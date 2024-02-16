
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

export const { reloadCart, initCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
