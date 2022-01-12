import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HEADER_MENUS } from '../../const';
import { fetchSearchingAction } from '../../store/api-actions';
import { getSearchingGuitars } from '../../store/user-data/selectors';

function Header():JSX.Element {
  const [search, setSearch] = useState<string>('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const searchingGuitars = useSelector(getSearchingGuitars);

  const dispatch = useDispatch();

  const handleSearchChange = (evt: FormEvent<HTMLInputElement>) => {
    setSearch(evt.currentTarget.value);
    dispatch(fetchSearchingAction(evt.currentTarget.value));
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><a className="header__logo logo"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {
              HEADER_MENUS.map((item, index) => {
                const key = `${index}-${item}`;
                // TODO: активное меню выделять
                return (
                  <li key={key}><a className="link main-nav__link" href="#">{item}</a></li>
                );
              })
            }
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              ref={searchRef}
              onChange={handleSearchChange}
              value={search}
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list${(search === '') ? ' hidden' : ''}`}>
            {
              (search === '' && searchingGuitars.length !== 0)
                ? ''
                : searchingGuitars.map((guitar) => {
                  const key = `${guitar.id}-${guitar.name}`;

                  return (
                    <li
                      key={key}
                      className="form-search__select-item"
                      tabIndex={0}
                      onClick={() => {/* //TODO переход на страницу с гитарой */}}
                    >
                      {guitar.name}
                    </li>
                  );
                })
            }
          </ul>
        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
