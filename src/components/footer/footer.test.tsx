import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';
import { FOOTER_MENUS } from '../../const';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    FOOTER_MENUS.map((item) => expect(screen.getByRole('link', { name: item })).toBeInTheDocument());
  });
});
