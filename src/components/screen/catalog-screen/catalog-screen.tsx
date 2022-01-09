import { useSelector } from 'react-redux';
import { RATING } from '../../../const';
import { getGuitars } from '../../../store/guitars-data/selectors';
import { numberWithSpaces } from '../../../utils/utils';
import Filter from '../../filter/filter';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Pagination from '../../pagination/pagination';
import Sorting from '../../sorting/sorting';


function CatalogScreen(): JSX.Element {
  const guitars = useSelector(getGuitars);

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
              {
                guitars.map((guitar, index) => {
                  const keyGuitar = `${index}-${guitar.name}`;
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
