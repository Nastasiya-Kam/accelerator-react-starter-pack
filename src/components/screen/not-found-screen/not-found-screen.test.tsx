import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NotFoundScreen from './not-found-screen';

jest.mock('../../header/header', () => ({
  __esModule: true,
  default: () => <div data-testid="Header" />,
}));

const mockStore = configureMockStore([thunk]);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'каталог'})).toBeInTheDocument();
  });
});
