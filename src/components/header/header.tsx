import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute, DEFAULT_PAGE, EMPTY_CART, HEADER_MENUS, KeyCode, ReplacedPart, UserActivity } from '../../const';
import { fetchSearchingAction } from '../../store/api-actions';
import { getCountGuitarsInCart } from '../../store/cart-data/selectors';
import { getSearchingGuitars } from '../../store/user-data/selectors';

type Props = {
  isMain: boolean,
}

function Header({isMain}: Props):JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<any>(null);
  const searchingGuitars = useSelector(getSearchingGuitars);
  const guitarsInCart = useSelector(getCountGuitarsInCart);

  const dispatch = useDispatch();

  const handleSearchChange = (evt: FormEvent<HTMLInputElement>) => {
    setSearch(evt.currentTarget.value);
    setIsSearching(true);
    dispatch(fetchSearchingAction(evt.currentTarget.value));
  };

  const handleItemKeyDown = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if (evt.keyCode === KeyCode.Enter || evt.keyCode === KeyCode.Space) {
      browserHistory.push(AppRoute.GuitarPage.replace(ReplacedPart.GuitarId, String(id)));
    }
  };


  useEffect(() => {
    const handleOutsideClick = (evt: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(evt.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener(UserActivity.Mousedown, handleOutsideClick);
    return () => document.removeEventListener(UserActivity.Mousedown, handleOutsideClick);
  }, [ isSearching, wrapperRef ]);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={isMain ? '##' : AppRoute.Root}><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {
              HEADER_MENUS.map((item) => {
                const key = `main-menu-${item}`;
                return (
                  <li key={key}><Link className="link main-nav__link" to={(!isMain && item === 'Каталог') ? AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`) : '##'}>{item}</Link></li>
                );
              })
            }
          </ul>
        </nav>
        <div className="form-search" ref={wrapperRef}>
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              ref={searchRef}
              onChange={handleSearchChange}
              onFocus={handleSearchChange}
              value={search}
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list${(!isSearching) ? ' hidden' : ''}`}>
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
                      onClick={() => browserHistory.push(AppRoute.GuitarPage.replace(ReplacedPart.GuitarId, String(guitar.id)))}
                      onKeyDown={(evt) => handleItemKeyDown(evt, guitar.id)}
                    >
                      {guitar.name}
                    </li>
                  );
                })
            }
          </ul>
        </div>
        <Link to={AppRoute.CartPage} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {(guitarsInCart !== EMPTY_CART) && <span className="header__cart-count">{guitarsInCart}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
