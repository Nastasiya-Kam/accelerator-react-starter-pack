import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeGuitarsCart } from '../../utils/mocks';
import CartItemQuantity from './cart-item-quantity';
import userEvent from '@testing-library/user-event';

const mockGuitars = makeFakeGuitarsCart(2);
const mockStore = configureMockStore([thunk]);

describe('Component: CartItemQuantity', () => {
  const history = createMemoryHistory();
  const onClick = jest.fn();
  const onDeleteClick = jest.fn();
  const guitarId = 1;
  const count = 1;

  it('should render correctly', () => {
    const guitars = [mockGuitars, {...mockGuitars[0], id: guitarId}];
    const store = mockStore({
      CART: {
        guitarsInCart: guitars,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItemQuantity guitarId={guitarId} count={count} onClick={onClick} onDeleteClick={onDeleteClick} />
        </Router>
      </Provider>,
    );

    const increaseCount = screen.getByRole('button', { name: 'Уменьшить количество' });
    const decreaseCount = screen.getByRole('button', { name: 'Увеличить количество' });

    expect(increaseCount).toBeInTheDocument();
    expect(decreaseCount).toBeInTheDocument();
  });

  it('should to call delete of guitar', () => {
    const guitars = [mockGuitars, {...mockGuitars[0], id: guitarId, count: count}];
    const store = mockStore({
      CART: {
        guitarsInCart: guitars,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItemQuantity guitarId={guitarId} count={count} onClick={onClick} onDeleteClick={onDeleteClick} />
        </Router>
      </Provider>,
    );

    const increaseCount = screen.getByRole('button', { name: 'Уменьшить количество' });

    userEvent.click(increaseCount);
    expect(onDeleteClick).toHaveBeenCalled();
  });
});
