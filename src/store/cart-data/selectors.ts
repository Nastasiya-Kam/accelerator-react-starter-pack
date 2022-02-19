import { GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;
const getCountGuitarsInCart = (state: State): number => state[NameSpace.Cart].guitarsInCart.length;

export {
  getGuitarsInCart,
  getCountGuitarsInCart
};
