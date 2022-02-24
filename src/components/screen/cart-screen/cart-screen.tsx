import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../../const';
import { GuitarCart } from '../../../types/guitars';
import CartFooter from '../../cart-footer/cart-footer';
import CartList from '../../cart-list/cart-list';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import CartDeletePopup from '../../popup/cart-delete-popup/cart-delete-popup';

function CartScreen(): JSX.Element {
  const [currentGuitar, setCurrentGuitar] = useState<GuitarCart | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const isMain = false;

  return (
    <div className="wrapper">
      <Header isMain={isMain} />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link></li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`)}>Каталог</Link></li>
            <li className="breadcrumbs__item"><a className="link">Корзина</a></li>
          </ul>
          <div className="cart">
            <CartList onGuitarClick={setCurrentGuitar} onDeleteClick={setIsOpened} />
            <CartFooter />
          </div>
        </div>
      </main>
      <Footer isMain={isMain} />
      {(isOpened && currentGuitar !== null) && <CartDeletePopup guitar={currentGuitar} onClick={setIsOpened} />}
    </div>
  );
}

export default CartScreen;
