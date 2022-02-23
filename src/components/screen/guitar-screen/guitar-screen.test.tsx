import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars, makeFakeGuitarsCart } from '../../../utils/mocks';
import GuitarScreen from './guitar-screen';
import thunk from 'redux-thunk';

const mockGuitar = makeFakeGuitar();
const mockGuitars = makeFakeGuitars();
const mockGuitarsCart = makeFakeGuitarsCart(5);
const mockComments = makeFakeComments(10);
mockGuitar.comments = mockComments;
const mockStore = configureMockStore([thunk]);

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {

    const store = mockStore({
      USER: {
        searchingGuitars: mockGuitars,
      },
      GUITAR: {
        guitar: mockGuitar,
        isDataLoaded: true,
        isGuitarLoading: false,
        isGuitarLoadingError: false,
      },
      CART: {
        guitarsInCart: mockGuitarsCart,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main-title')).toBeInTheDocument();
  });

  it('should render loading text', () => {
    const store = mockStore({
      USER: {
        searchingGuitars: mockGuitars,
      },
      GUITAR: {
        guitar: mockGuitar,
        isDataLoaded: true,
        isGuitarLoading: false,
        isGuitarLoadingError: true,
      },
      CART: {
        guitarsInCart: mockGuitarsCart,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Не удалось загрузить данные с сервера. Попробуйте позже')).toBeInTheDocument();
  });
});
