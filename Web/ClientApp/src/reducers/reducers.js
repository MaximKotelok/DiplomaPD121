
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

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        favourite: []
    },
    reducers: {
        addFavourite: (state, action) => {
            state.favourite.push(action.payload)
        },
        removeFavourite: (state, action) => {
            const index = state.favourite.indexOf(action.payload);
            if (index > -1) { 
                state.favourite = state.favourite.splice(index, 1); 
            }
        },
    },
});

export const { reloadCart, initCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const { addCategory } = catalogueSlice.actions;
export const catalogueReducer = catalogueSlice.reducer;

export const { addFavourite, removeFavourite } = catalogueSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
