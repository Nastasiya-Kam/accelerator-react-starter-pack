import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../screen/catalog-screen/catalog-screen';
import NotFoundScreen from '../screen/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <CatalogScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
