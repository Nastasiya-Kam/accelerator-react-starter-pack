import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import { loadCartData } from '../action';

const initialState: CartData = {
  guitarsInCart: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCartData, (state, action) => {
      state.guitarsInCart = action.payload;
    });
});

export { cartData };
