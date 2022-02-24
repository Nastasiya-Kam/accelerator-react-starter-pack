import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_DISCOUNT } from '../../const';
import { CartData } from '../../types/state';
import { addToCart, loadCartData, updateGuitar, deleteGuitar, loadDiscount, loadCoupon } from '../action';

const initialState: CartData = {
  guitarsInCart: [],
  discount: DEFAULT_DISCOUNT,
  coupon: '',
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
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    })
    .addCase(loadCoupon, (state, action) => {
      state.coupon = action.payload;
    });
});

export { cartData };
