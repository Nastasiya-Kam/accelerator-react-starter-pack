import { makeFakeGuitarsCart } from '../../utils/mocks';
import { loadCartData } from '../action';
import { cartData } from './cart-data';

const mockGuitar = makeFakeGuitarsCart(3);

describe('Reducer: cart-data', () => {
  const state = {
    guitarsInCart: [],
  };

  it('should loaded guitar', () => {
    expect(cartData(state, loadCartData(mockGuitar)))
      .toEqual({...state, guitarsInCart: mockGuitar});
  });
});
