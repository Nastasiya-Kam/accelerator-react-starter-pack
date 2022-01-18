import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../../const';
import { setFilterMaxPrice, setFilterMinPrice, setFilterStrings, setFilterTypes, setOrder, setSorting } from '../../../store/action';
import Footer from '../../footer/footer';
import Header from '../../header/header';

function NotFoundScreen():JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilterMinPrice(''));
    dispatch(setFilterMaxPrice(''));
    dispatch(setFilterTypes([]));
    dispatch(setFilterStrings([]));
    dispatch(setSorting(''));
    dispatch(setOrder(''));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <p>404. Страница не найдена</p>
          <p>Вернуться в <Link to={AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`)} className="link">каталог</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
