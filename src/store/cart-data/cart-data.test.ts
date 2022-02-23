import { makeFakeGuitarCart, makeFakeGuitarsCart } from '../../utils/mocks';
import { addToCart, loadCartData } from '../action';
import { cartData } from './cart-data';

const mockGuitars = makeFakeGuitarsCart(3);
const mockGuitar = makeFakeGuitarCart();

describe('Reducer: cart-data', () => {

  it('should loaded guitar in the cart', () => {
    const state = {
      guitarsInCart: [],
    };

    expect(cartData(state, loadCartData(mockGuitars)))
      .toEqual({...state, guitarsInCart: mockGuitars});
  });

  it('should add guitar to the cart', () => {
    const state = {
      guitarsInCart: mockGuitars,
    };

    expect(cartData(state, addToCart(mockGuitar)))
      .toEqual({...state, guitarsInCart: [ ...state.guitarsInCart, mockGuitar ]});
  });
});
