import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly 4 rating', () => {
    const history = createMemoryHistory();
    const countRating = 4;

    render(
      <Router history={history}>
        <Rating width={14} height={14} count={countRating} />
      </Router>,
    );

    expect(screen.getByTestId('star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-1')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-2')).toBeInTheDocument();
    expect(screen.getByTestId('star-2')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-3')).toBeInTheDocument();
    expect(screen.getByTestId('star-3')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-4')).toBeInTheDocument();
    expect(screen.getByTestId('star-4')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-5')).toBeInTheDocument();
    expect(screen.getByTestId('star-5')).toContainHTML('#icon-star');
  });

  it('should render correctly 2 rating', () => {
    const history = createMemoryHistory();
    const countRating = 2;

    render(
      <Router history={history}>
        <Rating width={14} height={14} count={countRating} />
      </Router>,
    );

    expect(screen.getByTestId('star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-1')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-2')).toBeInTheDocument();
    expect(screen.getByTestId('star-2')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-3')).toBeInTheDocument();
    expect(screen.getByTestId('star-3')).toContainHTML('#icon-star');
    expect(screen.getByTestId('star-4')).toBeInTheDocument();
    expect(screen.getByTestId('star-4')).toContainHTML('#icon-star');
    expect(screen.getByTestId('star-5')).toBeInTheDocument();
    expect(screen.getByTestId('star-5')).toContainHTML('#icon-star');
  });


  it('should render correctly 1 rating', () => {
    const history = createMemoryHistory();
    const countRating = 1;

    render(
      <Router history={history}>
        <Rating width={14} height={14} count={countRating} />
      </Router>,
    );

    expect(screen.getByTestId('star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-1')).toContainHTML('#icon-full-star');
    expect(screen.getByTestId('star-2')).toBeInTheDocument();
    expect(screen.getByTestId('star-2')).toContainHTML('#icon-star');
    expect(screen.getByTestId('star-3')).toBeInTheDocument();
    expect(screen.getByTestId('star-3')).toContainHTML('#icon-star');
    expect(screen.getByTestId('star-4')).toBeInTheDocument();
    expect(screen.getByTestId('star-4')).toContainHTML('#icon-star');
    expect(screen.getByTestId('star-5')).toBeInTheDocument();
    expect(screen.getByTestId('star-5')).toContainHTML('#icon-star');
  });
});
