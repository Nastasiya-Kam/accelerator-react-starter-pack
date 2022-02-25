import { createMemoryHistory } from 'history';
import CartFooter from './cart-footer';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

jest.mock('../cart-coupon/cart-coupon', () => ({
  __esModule: true,
  default: () => <div data-testid="CartCoupon" />,
}));

jest.mock('../cart-total-info/cart-total-info', () => ({
  __esModule: true,
  default: () => <div data-testid="CartTotalInfo" />,
}));

describe('Component: CartFooter', () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <CartFooter />
    </Router>,
  );

  it('should render correctly', () => {
    expect(screen.getByTestId('CartCoupon')).toBeInTheDocument();
    expect(screen.getByTestId('CartTotalInfo')).toBeInTheDocument();
  });
});
