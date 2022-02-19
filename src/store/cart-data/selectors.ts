import { createSelector } from 'reselect';
import { GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { getCartSumm, getCountOfGuitarId, getUniqueGuitars } from '../../utils/cart';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;
const getCountGuitarsInCart = (state: State): number => state[NameSpace.Cart].guitarsInCart.length;
const getUniqueGuitarsInCart = (state: State): GuitarsCart => getUniqueGuitars(state[NameSpace.Cart].guitarsInCart);
const getCountOfGuitarsIdInCart = createSelector(
  [ getGuitarsInCart, getUniqueGuitarsInCart ],
  (guitarsInCart, uniqueGuitars) => getCountOfGuitarId(uniqueGuitars, guitarsInCart),
);
const getSummOfGuitarsInCart = createSelector(
  [ getGuitarsInCart ],
  (guitarsInCart) => getCartSumm(guitarsInCart),
);

export {
  getGuitarsInCart,
  getCountGuitarsInCart,
  getUniqueGuitarsInCart,
  getCountOfGuitarsIdInCart,
  getSummOfGuitarsInCart
};
