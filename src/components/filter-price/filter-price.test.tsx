import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FilterPrice from './filter-price';
import { makeFakeGuitars } from '../../utils/mocks';
import { Sort } from '../../const';
import userEvent from '@testing-library/user-event';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: FilterPrice', () => {
  const minPrice = 5000;
  const maxPrice = 15000;

  const store = mockStore({
    GUITARS: {
      guitars: mockGuitars,
      firstMinPrice: minPrice,
      firstMaxPrice: maxPrice,
      pageCount: 3,
      isDataLoaded: true,
    },
    USER: {
      minPrice: String(minPrice),
      maxPrice: String(maxPrice),
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
        <FilterPrice />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
  });

  it('should render the highest/minimum possible price when the user tries to enter a value greater/less than possible', () => {
    render(fakeApp);

    userEvent.type(screen.getByTestId('min-price'), String(minPrice - 1));
    userEvent.type(screen.getByTestId('max-price'), String(maxPrice + 1));
    userEvent.tab();

    expect(screen.getByDisplayValue(String(minPrice))).toBeInTheDocument();
    expect(screen.getByDisplayValue(String(maxPrice))).toBeInTheDocument();
  });
});
