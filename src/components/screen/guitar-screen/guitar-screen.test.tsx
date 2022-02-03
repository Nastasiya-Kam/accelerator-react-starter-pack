import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars } from '../../../utils/mocks';
import GuitarScreen from './guitar-screen';
import thunk from 'redux-thunk';

const mockGuitar = makeFakeGuitar();
const mockGuitars = makeFakeGuitars();
const mockComments = makeFakeComments();
const mockStore = configureMockStore([thunk]);

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        searchingGuitars: mockGuitars,
      },
      GUITAR: {
        guitar: mockGuitar,
        comments: mockComments,
        isDataLoaded: true,
        isGuitarLoading: false,
        isGuitarLoadingError: false,
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
        comments: mockComments,
        isDataLoaded: true,
        isGuitarLoading: false,
        isGuitarLoadingError: true,
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
