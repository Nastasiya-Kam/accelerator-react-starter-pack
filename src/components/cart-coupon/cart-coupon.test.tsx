import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CartCoupon from './cart-coupon';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);

describe('Component: CartCoupon', () => {
  const store = mockStore({
    CART: {
      coupon: '',
    },
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartCoupon />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('Промокод'), '12345');
    expect(screen.getByDisplayValue(/12345/i)).toBeInTheDocument();
  });
});
