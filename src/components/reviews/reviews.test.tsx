import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeComments, makeFakeGuitar } from '../../utils/mocks';
import Reviews from './reviews';

const mockStore = configureMockStore([thunk]);

describe('Component: Review', () => {
  const guitarId = 10;
  const onClick = jest.fn();

  it('should render correctly', () => {
    const mockGuitar = makeFakeGuitar();
    mockGuitar.comments = makeFakeComments(10);

    const store = mockStore({
      GUITAR: {
        guitar: mockGuitar,
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
    const mockGuitar = makeFakeGuitar();
    mockGuitar.comments = [];

    const store = mockStore({
      GUITAR: {
        guitar: mockGuitar,
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
