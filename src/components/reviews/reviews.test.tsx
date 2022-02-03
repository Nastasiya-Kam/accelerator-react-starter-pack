import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeComments } from '../../utils/mocks';
import Reviews from './reviews';

const mockComments = makeFakeComments();
const mockStore = configureMockStore([thunk]);

describe('Component: Review', () => {
  const guitarId = 10;
  const onClick = jest.fn();

  it('should render correctly', () => {
    const store = mockStore({
      GUITAR: {
        comments: mockComments,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Reviews guitarId={guitarId} onClick={onClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Наверх')).toBeInTheDocument();
    expect(screen.getByText('Показать еще отзывы')).toBeInTheDocument();
  });

  it('should render empty list', () => {
    const store = mockStore({
      GUITAR: {
        comments: [],
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Reviews guitarId={guitarId} onClick={onClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Комментарии ещё никто не оставил/i)).toBeInTheDocument();
    expect(screen.queryByText('Показать еще отзывы')).not.toBeInTheDocument();
  });
});
