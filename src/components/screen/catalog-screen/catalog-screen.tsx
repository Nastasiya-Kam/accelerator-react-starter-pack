import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, PaginationPage, PAGINATION_STEP, RATING, ReplacedPart } from '../../../const';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFilterStrings, setFilterTypes, setFirstPage, setLastPage, setOrder, setSorting } from '../../../store/action';
import { fetchFilterAction } from '../../../store/api-actions';
import { getStatusLoadingError, getGuitars, getLoadingDataStatus, getLoadingStatus } from '../../../store/guitars-data/selectors';
import { getCurrentPageCount, getFilter } from '../../../store/user-data/selectors';
import { getCurrentItemsRange } from '../../../utils/filter';
import { getIndex, numberWithSpaces } from '../../../utils/utils';
import Filter from '../../filter/filter';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Pagination from '../../pagination/pagination';
import Sorting from '../../sorting/sorting';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { Filter as FilterParams } from '../../../const';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  currentPage: number,
}

function CatalogScreen({currentPage}: Props): JSX.Element {
  const pageCount = useSelector(getCurrentPageCount);

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const searchPath = {
      start: searchParams.get(FilterParams.Start),
      min: searchParams.get(FilterParams.PriceGte),
      max: searchParams.get(FilterParams.PriceLte),
      types: searchParams.getAll(FilterParams.Type),
      strings: searchParams.getAll(FilterParams.StringCount),
      sortingType: searchParams.get(FilterParams.SortingType),
      sortingOrder: searchParams.get(FilterParams.OrderingType),
    };

    if (searchPath.min !== null) {
      dispatch(setFilterMinPrice(searchPath.min));
    }

    if (searchPath.max !== null) {
      dispatch(setFilterMaxPrice(searchPath.max));
    }

    if (searchPath.types !== null) {
      dispatch(setFilterTypes(searchPath.types));
    }

    if (searchPath.strings !== null) {
      dispatch(setFilterStrings(searchPath.strings));
    }

    if (searchPath.sortingType !== null) {
      dispatch(setSorting(searchPath.sortingType));
    }

    if (searchPath.sortingOrder !== null) {
      dispatch(setOrder(searchPath.sortingOrder));
    }

    if (searchPath.start !== null) {
      let firstPage = PaginationPage.First;
      let lastPage = PaginationPage.Last;

      if (currentPage % PAGINATION_STEP === 0) {
        firstPage = currentPage - 3;
        lastPage = currentPage;
      }
      if (currentPage % PAGINATION_STEP === 1) {
        firstPage = currentPage - 1;
        lastPage = currentPage + 2;
      }
      if (currentPage % PAGINATION_STEP === 2) {
        firstPage = currentPage - 2;
        lastPage = currentPage + 1;
      }

      const currentIndexRange = getIndex(currentPage);

      searchParams.has(FilterParams.Start)
        ? searchParams.set(FilterParams.Start, String(currentIndexRange.startIndex))
        : searchParams.append(FilterParams.Start, String(currentIndexRange.startIndex));
      searchParams.has(FilterParams.End)
        ? searchParams.set(FilterParams.End, String(currentIndexRange.lastIndex))
        : searchParams.append(FilterParams.End, String(currentIndexRange.lastIndex));

      dispatch(setFirstPage(firstPage));
      dispatch(setLastPage(lastPage));
      dispatch(setCurrentPage(currentPage));
    }
  });

  const guitars = useSelector(getGuitars);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getLoadingStatus);
  const isDataLoaded = useSelector(getLoadingDataStatus);
  const isLoadingError = useSelector(getStatusLoadingError);

  useEffect(() => {
    const range = getCurrentItemsRange(currentPage);
    dispatch(fetchFilterAction(range, filter));
  }, [ pageCount, currentPage, filter, dispatch]);

  if (isDataLoaded && (currentPage > pageCount) && (pageCount !== 0)) {
    return <NotFoundScreen />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            {/* //TODO: хлебные крошки откуда собираются? */}
            <li className="breadcrumbs__item"><a className="link" href="#">Главная</a></li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a></li>
          </ul>
          <div className="catalog">
            <Filter />
            <Sorting />
            <div className="cards catalog__cards">
              {(isLoading) && <p>Идёт загрузка данных...</p>}
              {(isLoadingError) && <p>Не удалось загрузить данные с сервера. Попробуйте позже</p>}
              {
                (!isLoading && !isLoadingError) && guitars.map((guitar) => {
                  const keyGuitar = `${guitar.id}-${guitar.name}`;
                  const { id, name, previewImg, rating, price } = guitar;

                  return (
                    <div key={keyGuitar} className="product-card"><img src={previewImg.replace('img', 'img/content')} width="75" height="190" alt={name} />
                      <div className="product-card__info">
                        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                          {
                            RATING.map((item, indexRating) => {
                              const keyRating = `${indexRating}-${item}`;

                              return (
                                <svg key={keyRating} width="12" height="11" aria-hidden="true">
                                  <use
                                    xlinkHref={item <= rating ? '#icon-full-star' : '#icon-star'}
                                  >
                                  </use>
                                </svg>
                              );
                            })
                          }
                          <span className="rate__count">{rating}</span>
                          <span className="rate__message"></span>
                        </div>
                        <p className="product-card__title">{name}</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{numberWithSpaces(price)} ₽</p>
                      </div>
                      <div className="product-card__buttons">
                        <Link className="button button--mini" to={AppRoute.GuitarPage.replace(ReplacedPart.GuitarId, String(id))}>Подробнее</Link>
                        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            {(!isLoadingError) && <Pagination />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;
