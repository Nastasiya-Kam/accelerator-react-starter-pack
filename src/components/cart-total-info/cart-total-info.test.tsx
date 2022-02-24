import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CartTotalInfo from './cart-total-info';
import { makeFakeGuitarsCart } from '../../utils/mocks';

const mockGuitarsCart = makeFakeGuitarsCart(3);
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: CartTotalInfo', () => {
  const store = mockStore({
    CART: {
      guitarsInCart: mockGuitarsCart,
      discount: 0,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartTotalInfo />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });
});
