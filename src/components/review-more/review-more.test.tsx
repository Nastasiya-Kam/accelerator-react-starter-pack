import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReviewMore from './review-more';
import { RENDER_COMMENTS_COUNT } from '../../const';

describe('Component: ReviewMore', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const onClick = jest.fn();

    render(
      <Router history={history}>
        <ReviewMore renderedCommentsCount={RENDER_COMMENTS_COUNT} onClick={onClick} />
      </Router>,
    );

    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
  });

  it('should calls "onClick" prop on button click', () => {
    const history = createMemoryHistory();
    const onClick = jest.fn();

    render(
      <Router history={history}>
        <ReviewMore renderedCommentsCount={RENDER_COMMENTS_COUNT} onClick={onClick} />
      </Router>,
    );

    userEvent.click(screen.getByText(/Показать еще отзывы/i));
    expect(onClick).toHaveBeenCalled();
  });
});
