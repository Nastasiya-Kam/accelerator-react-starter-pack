import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ButtonCross from './button-cross';
import userEvent from '@testing-library/user-event';

describe('Component: ButtonCross', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const onClick = jest.fn();

    render(
      <Router history={history}>
        <ButtonCross onClick={onClick} />
      </Router>,
    );

    userEvent.click(screen.getByLabelText(/Закрыть/i));
    expect(onClick).toHaveBeenCalled();
  });
});
