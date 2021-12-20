import { Route, Router as BrowserRouter, Switch } from 'react-router';
import { AppRoute } from '../../const';
import CatalogScreen from '../screen/catalog-screen/catalog-screen';
import NotFoundScreen from '../screen/not-found/not-found';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <CatalogScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
