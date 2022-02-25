import { GuitarsCart } from '../types/guitars';

const getCartSumm = (guitars: GuitarsCart): number => guitars.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);

export {
  getCartSumm
};
