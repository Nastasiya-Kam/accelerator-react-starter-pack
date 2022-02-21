import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import { addToCart, loadCartData, updateGuitar, decreaseGuitar } from '../action';

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
    })
    .addCase(updateGuitar, (state, action) => {
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload.id);
      const currentCount = state.guitarsInCart[index].count + 1;
      state.guitarsInCart = [
        ...state.guitarsInCart.slice(0, index),
        { ...action.payload, count: currentCount },
        ...state.guitarsInCart.slice(index + 1),
      ];
    })
    .addCase(decreaseGuitar, (state, action) => {
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload.id);
      const currentCount = state.guitarsInCart[index].count - 1;
      state.guitarsInCart = [
        ...state.guitarsInCart.slice(0, index),
        { ...action.payload, count: currentCount },
        ...state.guitarsInCart.slice(index + 1),
      ];
    });
});

export { cartData };
