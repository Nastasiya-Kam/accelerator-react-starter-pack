import { Guitars } from '../types/guitars';

const getCartSumm = (guitars: Guitars) => guitars.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

export {
  getCartSumm
};
