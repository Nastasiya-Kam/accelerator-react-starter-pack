import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeGuitars } from '../../utils/mocks';
import App from './app';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {
    guitars: mockGuitars,
    isDataLoaded: true,
  },
  USER: {},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в/i)).toBeInTheDocument();
  });
});
