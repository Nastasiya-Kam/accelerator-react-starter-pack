import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RATING } from '../../../const';
import { setCurrentPage } from '../../../store/action';
import { fetchFilterAction } from '../../../store/api-actions';
import { getStatusLoadingError, getGuitars, getLoadingDataStatus, getLoadingStatus } from '../../../store/guitars-data/selectors';
import { getCurrentPage, getCurrentPageCount, getFilter } from '../../../store/user-data/selectors';
import { getCurrentItemsRange } from '../../../utils/filter';
import { numberWithSpaces } from '../../../utils/utils';
import Filter from '../../filter/filter';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Pagination from '../../pagination/pagination';
import Sorting from '../../sorting/sorting';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type Props = {
  currentPage: number,
}

function CatalogScreen({currentPage}: Props): JSX.Element {
  const guitars = useSelector(getGuitars);
  const filter = useSelector(getFilter);
  const page = useSelector(getCurrentPage);
  const pageCount = useSelector(getCurrentPageCount);
  const isLoading = useSelector(getLoadingStatus);
  const isDataLoaded = useSelector(getLoadingDataStatus);
  const isLoadingError = useSelector(getStatusLoadingError);

  const dispatch = useDispatch();

  const range = getCurrentItemsRange(page);

  useEffect(() => {
    // let usingPage = currentPage;

    // if (usingPage > pageCount) {
    //   usingPage = DEFAULT_PAGE;
    // }

    dispatch(setCurrentPage(currentPage));
    dispatch(fetchFilterAction(range, filter));
  }, [currentPage, pageCount, range, filter, dispatch]);

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
                  const { name, previewImg, rating, price } = guitar;

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
                        <a className="button button--mini" href="#">Подробнее</a>
                        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;
