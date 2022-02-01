import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars } from '../../../utils/mocks';
import GuitarScreen from './guitar-screen';
import { Sort } from '../../../const';
import thunk from 'redux-thunk';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {
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
        searchingGuitars: mockGuitars,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main-title')).toBeInTheDocument();
  });
});
