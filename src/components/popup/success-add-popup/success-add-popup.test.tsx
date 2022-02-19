import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import SuccessAddPopup from './success-add-popup';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: SuccessAddPopup', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const history = createMemoryHistory();
    const onClick = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <SuccessAddPopup onClick={onClick} isCatalogPage={false} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    userEvent.click(screen.getByText('Перейти в корзину'));
    expect(onClick).toHaveBeenCalled();

    userEvent.click(screen.getByText('Продолжить покупки'));
    expect(onClick).toHaveBeenCalled();
  });
});
