import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars, makeFakeGuitarsCart } from '../../../utils/mocks';
import CatalogScreen from './catalog-screen';
import { DEFAULT_PAGE, Sort } from '../../../const';
import thunk from 'redux-thunk';

const mockGuitars = makeFakeGuitars();
const mockGuitarsCart = makeFakeGuitarsCart(10);
const mockStore = configureMockStore([thunk]);

describe('Component: CatalogScreen', () => {
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
      CART: {
        guitarsInCart: mockGuitarsCart,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogScreen currentPage={DEFAULT_PAGE} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });
});
