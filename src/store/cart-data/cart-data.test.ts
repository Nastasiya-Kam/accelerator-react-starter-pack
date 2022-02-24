import { makeFakeGuitarCart, makeFakeGuitarsCart } from '../../utils/mocks';
import { addToCart, loadCartData, loadDiscount } from '../action';
import { cartData } from './cart-data';

const mockGuitars = makeFakeGuitarsCart(3);
const mockGuitar = makeFakeGuitarCart();

describe('Reducer: cart-data', () => {

  it('should loaded guitar in the cart', () => {
    const state = {
      guitarsInCart: [],
      discount: 0,
    };

    expect(cartData(state, loadCartData(mockGuitars)))
      .toEqual({...state, guitarsInCart: mockGuitars});
  });

  it('should add guitar to the cart', () => {
    const state = {
      guitarsInCart: mockGuitars,
      discount: 0,
    };

    expect(cartData(state, addToCart(mockGuitar)))
      .toEqual({...state, guitarsInCart: [ ...state.guitarsInCart, mockGuitar ]});
  });

  it('should load discount', () => {
    const state = {
      guitarsInCart: [],
      discount: 0,
    };

    const discount = 35;

    expect(cartData(state, loadDiscount(discount)))
      .toEqual({...state, discount: discount});
  });
});
