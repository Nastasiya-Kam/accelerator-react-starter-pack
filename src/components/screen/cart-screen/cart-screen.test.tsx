import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars, makeFakeGuitarsCart } from '../../../utils/mocks';
import thunk from 'redux-thunk';
import CartScreen from './cart-screen';

const mockGuitarsCart = makeFakeGuitarsCart(10);
const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      CART: {
        guitarsInCart: mockGuitarsCart,
      },
      USER: {
        searchingGuitars: mockGuitars,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: 'Оформить заказ' })).toBeInTheDocument();
  });
});
