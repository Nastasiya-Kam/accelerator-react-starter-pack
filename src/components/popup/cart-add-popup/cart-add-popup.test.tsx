import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import CartAddPopup from './cart-add-popup';
import { makeFakeGuitar, makeFakeGuitarsCart } from '../../../utils/mocks';

const mockGuitar = makeFakeGuitar();
const mockGuitarCart = makeFakeGuitarsCart(5);
const mockStore = configureMockStore([thunk]);

describe('Component: CartAddPopup', () => {
  it('should render correctly', () => {
    const store = mockStore({
      CART: {
        guitarsInCart: mockGuitarCart,
      },
    });
    const history = createMemoryHistory();
    const onClick = jest.fn();
    const isAdded = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartAddPopup guitar={mockGuitar} onClick={onClick} isAdded={isAdded} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Добавить в корзину' }));
    expect(onClick).toHaveBeenCalled();
    expect(isAdded).toHaveBeenCalled();
  });
});
