import { createSelector } from 'reselect';
import { HUNDRED_PERCENT } from '../../const';
import { GuitarCart, GuitarId, GuitarsCart } from '../../types/guitars';
import { State } from '../../types/state';
import { getCartSumm } from '../../utils/cart';
import { NameSpace } from '../root-reducer';

const getGuitarsInCart = (state: State): GuitarsCart => state[NameSpace.Cart].guitarsInCart;
const getDiscount = (state: State): number => state[NameSpace.Cart].discount;
const getCurrentCoupon = (state: State): string => state[NameSpace.Cart].coupon;

const getCountGuitarsInCart = createSelector(
  [ getGuitarsInCart ],
  (guitarsInCart): number => guitarsInCart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0),
);

const getSummOfGuitarsInCart = createSelector(
  [ getGuitarsInCart ],
  (guitarsInCart): number => getCartSumm(guitarsInCart),
);

const getGuitarById  = (id: GuitarId) => createSelector(
  [ getGuitarsInCart ],
  (guitarsInCart): GuitarCart => {
    const index = guitarsInCart.findIndex((element) => element.id === id);
    return guitarsInCart[index];
  },
);

const getCurrentGuitarCount  = (id: GuitarId) => createSelector(
  [ getGuitarsInCart ],
  (guitarsInCart): number => {
    const index = guitarsInCart.findIndex((element) => element.id === id);
    if (index === -1) {
      return 0;
    }
    return guitarsInCart[index].count;
  },
);

const getDiscountSumm = createSelector(
  [ getSummOfGuitarsInCart, getDiscount ],
  (summOfGuitars, discount): number => summOfGuitars * discount / HUNDRED_PERCENT,
);

export {
  getGuitarsInCart,
  getCurrentCoupon,
  getCountGuitarsInCart,
  getSummOfGuitarsInCart,
  getGuitarById,
  getCurrentGuitarCount,
  getDiscountSumm
};
