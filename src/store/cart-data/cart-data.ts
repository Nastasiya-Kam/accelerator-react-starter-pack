import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import { addToCart, loadCartData } from '../action';

const initialState: CartData = {
  guitarsInCart: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCartData, (state, action) => {
      state.guitarsInCart = action.payload;
    })
    .addCase(addToCart, (state, action) => {
      state.guitarsInCart = [...state.guitarsInCart, action.payload];
    });
});

export { cartData };
