import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ratingSize, ReplacedPart, ScreenTab } from '../../../const';
import { fetchGuitarAction } from '../../../store/api-actions';
import { getCommentsCount, getGuitar, getGuitarLoadingDataStatus, getGuitarLoadingError, getGuitarLoadingStatus } from '../../../store/guitar-data/selectors';
import { GuitarId } from '../../../types/guitars';
import { getGuitarType, numberWithSpaces } from '../../../utils/utils';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Rating from '../../rating/rating';
import ReviewPopup from '../../popup/review-popup/review-popup';
import Reviews from '../../reviews/reviews';
import SuccessReviewPopup from '../../popup/success-review-popup/success-review-popup';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import CartAddPopup from '../../popup/cart-add-popup/cart-add-popup';
import SuccessAddPopup from '../../popup/success-add-popup/success-add-popup';

type Props = {
  id: GuitarId,
}

function GuitarScreen({id}: Props): JSX.Element {
  const guitar = useSelector(getGuitar);
  const commentsCount = useSelector(getCommentsCount);
  const isGuitarDataLoaded = useSelector(getGuitarLoadingDataStatus);
  const isGuitarLoadingError = useSelector(getGuitarLoadingError);
  const isLoading = useSelector(getGuitarLoadingStatus);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState<string>(ScreenTab.Characteristics);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isCartAddOpened, setIsCartAddOpened] = useState<boolean>(false);
  const [isCartAdded, setIsCartAdded] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [id, dispatch]);

  if (isGuitarDataLoaded && !guitar) {
    return <NotFoundScreen />;
  }

  const handleAddToCardClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setIsCartAddOpened(true);
  };

  const isMain = false;

  return (
    <div className="wrapper">
      <Header isMain={isMain} />
      <main className="page-content">
        {(isLoading) && <p>Идёт загрузка данных...</p>}
        {(isGuitarLoadingError) && <p>Не удалось загрузить данные с сервера. Попробуйте позже</p>}
        {
          (!isLoading && guitar)
            &&
            <div className="container">
              <h1 className="page-content__title title title--bigger" data-testid="main-title">{guitar.name}</h1>
              <ul className="breadcrumbs page-content__breadcrumbs">
                <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link></li>
                <li className="breadcrumbs__item"><Link className="link" to={AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`)}>Каталог</Link></li>
                <li className="breadcrumbs__item"><a className="link">{guitar.name}</a></li>
              </ul>
              <div className="product-container">
                <img className="product-container__img" src={guitar.previewImg.replace('img', 'img/content')} width="90" height="235" alt={guitar.name} />
                <div className="product-container__info-wrapper">
                  <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
                  <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                    <Rating height={ratingSize.item.height} width={ratingSize.item.width} count={guitar.rating} />
                    <span className="rate__count">{commentsCount}</span><span className="rate__message"></span>
                  </div>
                  <div className="tabs">
                    <a className={`button button--medium tabs__button${(currentTab === ScreenTab.Characteristics) ? '' : ' button--black-border'}`} href="#characteristics"
                      onClick={(evt) => {
                        evt.preventDefault();
                        setCurrentTab(ScreenTab.Characteristics);
                      }}
                    >
                      Характеристики
                    </a>
                    <a className={`button button--medium tabs__button${(currentTab === ScreenTab.Description) ? '' : ' button--black-border'}`} href="#description"
                      onClick={(evt) => {
                        evt.preventDefault();
                        setCurrentTab(ScreenTab.Description);
                      }}
                    >
                      Описание
                    </a>
                    <div className="tabs__content" id="characteristics">
                      <table className={`tabs__table${(currentTab === ScreenTab.Description) ? ' hidden' : ''}`}>
                        <tbody>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Артикул:</td>
                            <td className="tabs__value">{guitar.vendorCode}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Тип:</td>
                            <td className="tabs__value">{getGuitarType(guitar.type)}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Количество струн:</td>
                            <td className="tabs__value">{guitar.stringCount} струнная</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className={`tabs__product-description${(currentTab === ScreenTab.Characteristics) ? ' hidden' : ''}`}>{guitar.description}</p>
                    </div>
                  </div>
                </div>
                <div className="product-container__price-wrapper">
                  <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                  <p className="product-container__price-info product-container__price-info--value">{numberWithSpaces(guitar.price)} ₽</p>
                  {/* //TODO на следующем этапе кнопка добавляет товар в корзину */}
                  <a className="button button--red button--big product-container__button" href="##" onClick={(evt) => handleAddToCardClick(evt)}>Добавить в корзину</a>
                </div>
              </div>
              <Reviews onClick={setIsOpened} />
            </div>
        }
      </main>
      <Footer isMain={isMain} />
      {(isOpened && guitar?.id !== undefined) && <ReviewPopup onClick={setIsOpened} guitarId={guitar.id} isSuccess={setIsSuccess} />}
      {(!isOpened && isSuccess) && <SuccessReviewPopup onClick={setIsSuccess} />}
      {(isCartAddOpened && guitar !== null) && <CartAddPopup guitar={guitar} onClick={setIsCartAddOpened} isAdded={setIsCartAdded} />}
      {(!isCartAddOpened && isCartAdded) && <SuccessAddPopup onClick={setIsCartAdded} isCatalogPage={isMain} />}
    </div>
  );
}

export default GuitarScreen;
