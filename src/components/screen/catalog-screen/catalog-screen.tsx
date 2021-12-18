import { useSelector } from 'react-redux';
import { PAGINATIONS, RATING, STRINGS_COUNT, TYPE_GUITARS } from '../../../const';
import { getGuitars } from '../../../store/guitars-data/selectors';
import { numberWithSpaces } from '../../../utils/utils';
import Footer from '../../footer/footer';
import Header from '../../header/header';

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
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a></li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a></li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    {/*// TODO: placeholder зависит от получаемых данных по гитарам (минимальная цена) */}
                    {/*// TODO: минимальная цена не может быть ниже существующей минимальной. Принудительно проставляется минимальная */}
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    {/*// TODO: максималная цена не может быть выше существующей максималная. Принудительно проставляется максималная */}
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>

                {
                  TYPE_GUITARS.map((guitar, index) => {
                    const key = `${index}-${guitar}`;
                    // TODO: продумать checked. По умолчанию не расставлены.
                    // TODO: при обновлении сбрасывается?
                    return (
                      <div key={key} className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                        <label htmlFor="acoustic">{guitar}</label>
                      </div>
                    );
                  })
                }
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                {
                  STRINGS_COUNT.map((stringCount, index) => {
                    const key = `${index}-${stringCount}`;

                    // TODO: каждый тип гитары отличается по количеству струн
                    return (
                      <div key={key} className="form-checkbox catalog-filter__block-item">
                        <input className="visually-hidden" type="checkbox" id={`${stringCount}-strings`} name={`${stringCount}-strings`} />
                        <label htmlFor={`${stringCount}-strings`}>{stringCount}</label>
                      </div>
                    );
                  })
                }
              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1}>по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1}></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
              </div>
            </div>
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
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {/* //TODO: если первая страница, то кнопка назад - удалить */}
                {/* <li className="pagination__page pagination__page--prev" id="prev"><a className="link pagination__page-link" href="1">Назад</a></li> */}
                {
                  PAGINATIONS.map((pagination, index) => {
                    const key = `${index}-${pagination}`;
                    // TODO: настроить  pagination__page--active
                    return (
                      <li key={key} className="pagination__page">
                        <a className="link pagination__page-link" href={pagination}>{pagination}</a>
                      </li>
                    );
                  })
                }
                {/* //TODO: если листов больше нет, то кнопку далее - удалить */}
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;
