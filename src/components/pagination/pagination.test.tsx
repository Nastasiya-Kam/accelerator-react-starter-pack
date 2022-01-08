import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Pagination from './pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const createFakeApp = (store: any) => (
  <Provider store={store}>
    <Router history={history}>
      <Pagination />
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly pagination of three pages (current page is one)', () => {
    const store = mockStore({
      GUITARS: {
        pageCount: 3,
      },
      USER: {
        currentPage: 1,
        currentPageCount: 3,
        firstPage: 0,
        lastPage: 3,
      },
    });

    const fakeApp = createFakeApp(store);
    render(fakeApp);

    expect(screen.queryByRole('link', { name: 'Далее' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Назад' })).not.toBeInTheDocument();
  });

  it('should render correctly pagination of five pages (current page is five)', () => {
    const store = mockStore({
      GUITARS: {
        pageCount: 5,
      },
      USER: {
        currentPage: 5,
        currentPageCount: 5,
        firstPage: 3,
        lastPage: 5,
      },
    });

    const fakeApp = createFakeApp(store);
    render(fakeApp);

    expect(screen.getByRole('link', { name: 'Назад' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '5' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Далее' })).not.toBeInTheDocument();
  });

  it('should render correctly pagination of five pages (current page is two)', () => {
    const store = mockStore({
      GUITARS: {
        pageCount: 5,
      },
      USER: {
        currentPage: 2,
        currentPageCount: 5,
        firstPage: 0,
        lastPage: 3,
      },
    });

    const fakeApp = createFakeApp(store);
    render(fakeApp);

    expect(screen.queryByRole('link', { name: 'Назад' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Далее' })).toBeInTheDocument();
  });
});
