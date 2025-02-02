import { Route, Switch } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../const';
import CartScreen from '../screen/cart-screen/cart-screen';
import CatalogScreen from '../screen/catalog-screen/catalog-screen';
import GuitarScreen from '../screen/guitar-screen/guitar-screen';
import NotFoundScreen from '../screen/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <CatalogScreen currentPage={DEFAULT_PAGE} />
      </Route>
      <Route
        exact
        path={AppRoute.CatalogPage}
        render={(routerProps) => {
          const page = parseInt(routerProps?.match?.params.page.replace(ReplacedPart.PartPage, '') as string, 10);
          return <CatalogScreen currentPage={page} />;
        }}
      >
      </Route>
      <Route
        exact
        path={AppRoute.GuitarPage}
        render={(routerProps) => {
          const id = parseInt(routerProps?.match?.params?.id as string, 10);

          return <GuitarScreen id={id}/>;
        }}
      >
      </Route>
      <Route exact path={AppRoute.CartPage} >
        <CartScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
