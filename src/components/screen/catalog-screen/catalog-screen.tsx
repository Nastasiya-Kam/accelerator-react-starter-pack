import { RATING, STRINGS_COUNT, TYPE_GUITARS } from '../../../const';
import { guitars } from '../../../mocks';
import { numberWithSpaces } from '../../../utils/utils';
import Header from '../../header/header';

function CatalogScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
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
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
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
                    <div key={keyGuitar} className="product-card"><img src={previewImg.replace('img', 'img/content')} width="75" height="190" alt="СURT Z30 Plus" />
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
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{numberWithSpaces(price)} ₽
                        </p>
                      </div>
                      <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a></div>
                    </div>
                  );
                })
              }
            </div>
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a></li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a></li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a></li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container container"><a className="footer__logo logo"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></a>
          <div className="socials footer__socials">
            <ul className="socials__list">
              <li className="socials-item">
                <a className="socials__link" href="https://www.facebook.com/" aria-label="facebook">
                  <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#icon-facebook"></use>
                  </svg>
                </a>
              </li>
              <li className="socials-item">
                <a className="socials__link" href="https://www.instagram.com/" aria-label="instagram">
                  <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#icon-instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="socials-item">
                <a className="socials__link" href="https://www.twitter.com/" aria-label="twitter">
                  <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#icon-twitter"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <section className="footer__nav-section footer__nav-section--info">
            <h2 className="footer__nav-title">О нас</h2>
            <p className="footer__nav-content footer__nav-content--font-secondary">Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</p>
          </section>
          <section className="footer__nav-section footer__nav-section--links">
            <h2 className="footer__nav-title">Информация</h2>
            <ul className="footer__nav-list">
              <li className="footer__nav-list-item"><a className="link" href="#top">Где купить?</a></li>
              <li className="footer__nav-list-item"><a className="link" href="#top">Блог</a></li>
              <li className="footer__nav-list-item"><a className="link" href="#top">Вопрос - ответ</a></li>
              <li className="footer__nav-list-item"><a className="link" href="#top">Возврат</a></li>
              <li className="footer__nav-list-item"><a className="link" href="#top">Сервис-центры</a></li>
            </ul>
          </section>
          <section className="footer__nav-section footer__nav-section--contacts">
            <h2 className="footer__nav-title">Контакты</h2>
            <p className="footer__nav-content">г. Санкт-Петербург,<br/> м. Невский проспект, <br/>ул. Казанская 6.</p>
            <div className="footer__nav-content">
              <svg className="footer__icon" width="8" height="8" aria-hidden="true">
                <use xlinkHref="#icon-phone"></use>
              </svg><a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
            </div>
            <p className="footer__nav-content">Режим работы:<br/>
              <span className="footer__span">
                <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-clock"></use>
                </svg>
                <span> с 11:00 до 20:00</span>
                <span>без выходных</span>
              </span>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default CatalogScreen;
