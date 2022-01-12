import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './header';
import { HEADER_MENUS } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeGuitars } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const mockGuitars = makeFakeGuitars();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        isDataLoaded: true,
      },
      USER: {
        searchingGuitars: mockGuitars,
      },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
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
