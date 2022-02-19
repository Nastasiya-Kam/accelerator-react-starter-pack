import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import CartAddPopup from './cart-add-popup';
import { makeFakeGuitarCart } from '../../../utils/mocks';

const mockStore = configureMockStore();
const mockGuitarCart = makeFakeGuitarCart();

describe('Component: CartAddPopup', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const history = createMemoryHistory();
    const onClick = jest.fn();
    const isAdded = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartAddPopup guitar={mockGuitarCart} onClick={onClick} isAdded={isAdded} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Добавить в корзину' }));
    expect(onClick).toHaveBeenCalled();
    expect(isAdded).toHaveBeenCalled();
  });
});
