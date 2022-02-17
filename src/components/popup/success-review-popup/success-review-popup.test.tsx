import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import SuccessReviewPopup from './success-review-popup';

const mockStore = configureMockStore();

describe('Component: SuccessReviewPopup', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const history = createMemoryHistory();
    const onClick = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <SuccessReviewPopup onClick={onClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'К покупкам!' })).toBeInTheDocument();
  });
});
