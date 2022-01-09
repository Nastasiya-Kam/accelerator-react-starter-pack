import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars } from '../../utils/mocks';
import { Sort, STRINGS, TYPE_GUITARS } from '../../const';
import Filter from './filter';
import thunk from 'redux-thunk';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: Filter', () => {
  const store = mockStore({
    GUITARS: {
      guitars: mockGuitars,
      firstMinPrice: 1000,
      firstMaxPrice: 50000,
      pageCount: 3,
      isDataLoaded: true,
    },
    USER: {
      minPrice: '5000',
      maxPrice: '15000',
      types: [],
      strings: [],
      sorting: Sort.Price,
      order: '',
      currentPage: 1,
      currentPageCount: 0,
      firstPage: 1,
      lastPage: 3,
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <Filter />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);
    TYPE_GUITARS.map((guitar) => expect(screen.getByTestId(guitar.name)).toBeInTheDocument());
    STRINGS.map((string) => expect(screen.getByTestId(string)).toBeInTheDocument());
  });
});
