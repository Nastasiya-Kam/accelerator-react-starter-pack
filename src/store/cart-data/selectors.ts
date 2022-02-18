import { GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;

export {
  getGuitarsInCart
};
