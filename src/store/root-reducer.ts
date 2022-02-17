import { combineReducers } from 'redux';
import { cartData } from './cart-data/cart-data';
import { guitarData } from './guitar-data/guitar-data';
import { guitarsData } from './guitars-data/guitars-data';
import { userData } from './user-data/user-data';

enum NameSpace {
  Guitars = 'GUITARS',
  User = 'USER',
  Guitar = 'GUITAR',
  Cart = 'CART',
}

const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
  [NameSpace.User]: userData,
  [NameSpace.Guitar]: guitarData,
  [NameSpace.Cart]: cartData,
});

type RootState = ReturnType<typeof rootReducer>;

export type {RootState};
export {NameSpace, rootReducer};
