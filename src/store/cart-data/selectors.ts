import { createSelector } from 'reselect';
import { GuitarId, GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { getCartSumm, getCountOfGuitarId, getUniqueGuitars } from '../../utils/cart';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;
const getCountGuitarsInCart = (state: State): number => state[NameSpace.Cart].guitarsInCart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0);
const getSummOfGuitarsInCart = (state: State): number => getCartSumm(state[NameSpace.Cart].guitarsInCart);
const getUniqueGuitarsInCart = (state: State): GuitarsCart => getUniqueGuitars(state[NameSpace.Cart].guitarsInCart);

const getCurrentGuitarCount = (id: GuitarId) => (state: State): number => {
  const index = state[NameSpace.Cart].guitarsInCart.findIndex((element) => element.id === id);
  if (index === -1) {
    return 0;
  }
  return state[NameSpace.Cart].guitarsInCart[index].count;
};

const getCountOfGuitarsIdInCart = createSelector(
  [ getGuitarsInCart, getUniqueGuitarsInCart ],
  (guitarsInCart, uniqueGuitars) => getCountOfGuitarId(uniqueGuitars, guitarsInCart),
);

export {
  getGuitarsInCart,
  getCountGuitarsInCart,
  getSummOfGuitarsInCart,
  getUniqueGuitarsInCart,
  getCurrentGuitarCount,
  getCountOfGuitarsIdInCart
};
