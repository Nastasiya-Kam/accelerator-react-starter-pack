import Footer from '../../footer/footer';
import Header from '../../header/header';

function LoadingScreen():JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <p>Идёт загрузка...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoadingScreen;
