import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../../const';
import Footer from '../../footer/footer';
import Header from '../../header/header';

function NotFoundScreen():JSX.Element {
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
