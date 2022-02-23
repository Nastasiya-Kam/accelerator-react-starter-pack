import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './header';
import { HEADER_MENUS } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeGuitars, makeFakeGuitarsCart } from '../../utils/mocks';

const mockGuitars = makeFakeGuitars();
const mockGuitarsCart = makeFakeGuitarsCart(5);
const mockStore = configureMockStore([thunk]);

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        isDataLoaded: true,
      },
      USER: {
        searchingGuitars: mockGuitars,
      },
      CART: {
        guitarsInCart: mockGuitarsCart,
      },
    });
    const history = createMemoryHistory();
    const isMain = true;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header isMain={isMain} />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    HEADER_MENUS.map((item) => expect(screen.getByRole('link', { name: item })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Начать поиск' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Корзина' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Поиск/i), 'chester');

    expect(screen.getByDisplayValue(/chester/i)).toBeInTheDocument();
  });
});
