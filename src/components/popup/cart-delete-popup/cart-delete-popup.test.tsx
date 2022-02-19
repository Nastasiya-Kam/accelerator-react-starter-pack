import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { makeFakeGuitarCart } from '../../../utils/mocks';
import CartDeletePopup from './cart-delete-popup';

const mockStore = configureMockStore();
const mockGuitarCart = makeFakeGuitarCart();

describe('Component: CartAddPopup', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const history = createMemoryHistory();
    // const onClick = jest.fn();
    // const isAdded = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartDeletePopup guitar={mockGuitarCart} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    // userEvent.click(screen.getByRole('button', { name: 'Удалить товар' }));
    // expect(onClick).toHaveBeenCalled();
    // userEvent.click(screen.getByRole('button', { name: 'Продолжить покупки' }));
    // expect(isAdded).toHaveBeenCalled();
  });
});
