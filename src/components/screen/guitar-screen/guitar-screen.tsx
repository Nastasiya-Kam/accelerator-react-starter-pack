/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { fetchGuitarAction } from '../../../store/api-actions';
import { getGuitar } from '../../../store/guitar-data/selectors';
import { GuitarId } from '../../../types/guitars';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Reviews from '../../reviews/reviews';

type Props = {
  id: GuitarId,
}

function GuitarScreen({id}: Props): JSX.Element {
  const guitar = useSelector(getGuitar);
  console.log(guitar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [id, dispatch]);

  // TODO настраиваем отображение Not Found
  // TODO настраиваем отображение Loading

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger" data-testid="main-title">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link></li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.CatalogPage}>Каталог</Link></li>
            {/* //TODO вместо слова "товар" подставить наименование товара */}
            <li className="breadcrumbs__item"><a className="link">Товар</a></li>
          </ul>
          <div className="product-container"><img className="product-container__img" src="img/content/guitar-2.jpg" width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">СURT Z30 Plus</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                {/* //TODO если активна характеристика, то описание "tabs__product-description hidden". Если описание, то "tabs__table hidden"*/}
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">SO754565</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">Электрогитара</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">6 струнная</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">52 000 ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <Reviews />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GuitarScreen;
