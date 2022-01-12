import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeGuitars } from '../../utils/mocks';
import App from './app';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();
const store = mockStore({
  GUITARS: {
    guitars: mockGuitars,
    firstMinPrice: 1000,
    firstMaxPrice: 50000,
    pageCount: 3,
    isDataLoaded: false,
    isLoading: false,
  },
  USER: {
    minPrice: '5000',
    maxPrice: '15000',
    types: [],
    strings: [],
    sorting: '',
    order: '',
    currentPage: 1,
    currentPageCount: 3,
    firstPage: 1,
    lastPage: 3,
    searchingGuitars: mockGuitars,
  },
});
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в/i)).toBeInTheDocument();
  });
});
