import Footer from '../../footer/footer';
import Header from '../../header/header';

function NotFoundScreen():JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <p>404 not found</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
