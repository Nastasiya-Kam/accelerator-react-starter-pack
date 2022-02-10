import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import { createAPI } from './services/api';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
