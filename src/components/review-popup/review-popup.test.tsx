import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import ReviewPopup from './review-popup';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const mockGuitar = makeFakeGuitar();

describe('Component: ReviewPopup', () => {
  const correctUserData = {
    name: 'UserName',
    advantage: 'Одни достоинства',
    disadvantage: 'Только недостатки',
    comment: 'купил гитару, получил сковородку',
  };

  const incorrectUserData = {
    name: '',
    advantage: '',
    disadvantage: '',
    comment: '',
  };

  it('should render correctly', () => {
    const store = mockStore({
      GUITAR: {
        guitar: mockGuitar,
      },
    });

    const history = createMemoryHistory();
    const onClick = jest.fn();
    const isSuccess = jest.fn();
    const guitarId = 1;

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewPopup guitarId={guitarId} onClick={onClick} isSuccess={isSuccess} />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'Отправить отзыв' });

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    userEvent.type(screen.getByLabelText('Ваше Имя'), correctUserData.name);
    userEvent.type(screen.getByLabelText('Достоинства'), correctUserData.advantage);
    userEvent.type(screen.getByLabelText('Недостатки'), correctUserData.disadvantage);
    userEvent.type(screen.getByLabelText('Комментарий'), correctUserData.comment);

    expect(screen.getByDisplayValue(correctUserData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(correctUserData.advantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(correctUserData.disadvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(correctUserData.comment)).toBeInTheDocument();
  });

  it('should handle user actions correctly (except rating)', () => {
    const store = mockStore({
      GUITAR: {
        guitar: mockGuitar,
      },
    });

    const history = createMemoryHistory();
    const onClick = jest.fn();
    const isSuccess = jest.fn();
    const guitarId = 1;

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewPopup guitarId={guitarId} onClick={onClick} isSuccess={isSuccess} />
        </Router>
      </Provider>,
    );

    const name = screen.getByLabelText('Ваше Имя');
    const advantage = screen.getByLabelText('Достоинства');
    const disadvantage = screen.getByLabelText('Недостатки');
    const comment = screen.getByLabelText('Комментарий');
    const submitButton = screen.getByRole('button', { name: 'Отправить отзыв' });

    // * incorrect user data

    userEvent.type(name, '');
    userEvent.type(advantage, '');
    userEvent.type(disadvantage, '');
    userEvent.type(comment, '');
    userEvent.tab();

    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('advantage-error')).toBeInTheDocument();
    expect(screen.getByTestId('disadvantage-error')).toBeInTheDocument();
    expect(screen.getByTestId('comment-error')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // * incorrect some user data

    userEvent.type(name, correctUserData.name);
    userEvent.type(advantage, incorrectUserData.advantage);
    userEvent.type(disadvantage, correctUserData.disadvantage);
    userEvent.type(comment, incorrectUserData.comment);
    userEvent.tab();

    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('advantage-error')).toBeInTheDocument();
    expect(screen.queryByTestId('disadvantage-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('comment-error')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // * correct all user data

    userEvent.type(advantage, correctUserData.advantage);
    userEvent.type(comment, correctUserData.comment);
    userEvent.tab();

    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('advantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('disadvantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('comment-error')).not.toBeInTheDocument();
  });
});
