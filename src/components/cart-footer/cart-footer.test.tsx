import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CartFooter from './cart-footer';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();

describe('Component: CartFooter', () => {
  const store = mockStore({
    CART: {
      guitarsInCart: [],
      discount: 0,
      coupon: '',
    },
  });

  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <CartFooter />
      </Router>
    </Provider>,
  );

  it('should render correctly', () => {
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });
});
