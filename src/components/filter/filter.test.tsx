import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars } from '../../utils/mocks';
import { Sort, STRINGS, TYPE_GUITARS } from '../../const';
import Filter from './filter';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

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

  it('should checked all checkbox of types guitar', () => {
    render(fakeApp);
    TYPE_GUITARS.map((guitar) => userEvent.click(screen.getByTestId(guitar.name)));
    TYPE_GUITARS.map((guitar) => expect(screen.getByTestId(guitar.name)).toBeChecked());
  });

  it('should checked only "ukulele" type checkbox', () => {
    render(fakeApp);
    userEvent.click(screen.getByTestId(TYPE_GUITARS[2].name));

    expect(screen.getByTestId(TYPE_GUITARS[0].name)).not.toBeChecked();
    expect(screen.getByTestId(TYPE_GUITARS[1].name)).not.toBeChecked();
    expect(screen.getByTestId(TYPE_GUITARS[2].name)).toBeChecked();
  });

  it('should checked all checkbox of types string', () => {
    render(fakeApp);
    STRINGS.map((string) => userEvent.click(screen.getByTestId(string)));
    STRINGS.map((string) => expect(screen.getByTestId(string)).toBeChecked());
  });

  it('should checked only "7" strings checkbox', () => {
    render(fakeApp);
    userEvent.click(screen.getByTestId(STRINGS[2]));

    expect(screen.getByTestId(STRINGS[0])).not.toBeChecked();
    expect(screen.getByTestId(STRINGS[1])).not.toBeChecked();
    expect(screen.getByTestId(STRINGS[2])).toBeChecked();
    expect(screen.getByTestId(STRINGS[3])).not.toBeChecked();
  });
});
