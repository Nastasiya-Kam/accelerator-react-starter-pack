import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import PopupInfo from './popup-info';
import { makeFakeGuitarCart } from '../../utils/mocks';
import { getGuitarType } from '../../utils/utils';

describe('Component: PopupInfo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const guitar = makeFakeGuitarCart();

    render(
      <Router history={history}>
        <PopupInfo guitar={guitar} />
      </Router>,
    );

    userEvent.click(screen.getByText(`Гитара ${guitar.name}`));
    userEvent.click(screen.getByText(`Артикул: ${guitar.vendorCode}`));
    userEvent.click(screen.getByText(`${getGuitarType(guitar.type)}, ${guitar.stringCount} струнная`));
  });
});
