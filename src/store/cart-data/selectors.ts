import { createSelector } from 'reselect';
import { GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { getCartSumm, getCountOfGuitarId, getUniqueGuitars } from '../../utils/cart';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;
const getCountGuitarsInCart = (state: State): number => state[NameSpace.Cart].guitarsInCart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0);
const getSummOfGuitarsInCart = (state: State): number => getCartSumm(state[NameSpace.Cart].guitarsInCart);
const getUniqueGuitarsInCart = (state: State): GuitarsCart => getUniqueGuitars(state[NameSpace.Cart].guitarsInCart);
const getCountOfGuitarsIdInCart = createSelector(
  [ getGuitarsInCart, getUniqueGuitarsInCart ],
  (guitarsInCart, uniqueGuitars) => getCountOfGuitarId(uniqueGuitars, guitarsInCart),
);

export {
  getGuitarsInCart,
  getCountGuitarsInCart,
  getUniqueGuitarsInCart,
  getCountOfGuitarsIdInCart,
  getSummOfGuitarsInCart
};
