import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CartList from './cart-list';
import { makeFakeGuitarsCart } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockGuitars = makeFakeGuitarsCart(1);
const mockStore = configureMockStore([thunk]);

describe('Component: CartList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      CART: {
        guitarsInCart: mockGuitars,
      },
    });

    const history = createMemoryHistory();
    const onGuitarClick = jest.fn();
    const onDeleteClick = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartList onGuitarClick={onGuitarClick} onDeleteClick={onDeleteClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: 'Удалить' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Удалить' }));
    expect(onDeleteClick).toHaveBeenCalled();
  });
});
