import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import { addToCart, loadCartData, updateGuitar, deleteGuitar } from '../action';

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
      const updatedGuitar = { ...state.guitarsInCart[index], count: action.payload.count };

      state.guitarsInCart = [
        ...state.guitarsInCart.slice(0, index),
        updatedGuitar,
        ...state.guitarsInCart.slice(index + 1),
      ];
    })
    .addCase(deleteGuitar, (state, action) => {
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload);

      state.guitarsInCart = [
        ...state.guitarsInCart.slice(0, index),
        ...state.guitarsInCart.slice(index + 1),
      ];
    });
});

export { cartData };
