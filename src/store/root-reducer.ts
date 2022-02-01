import { combineReducers } from 'redux';
import { guitarData } from './guitar-data/guitar-data';
import { guitarsData } from './guitars-data/guitars-data';
import { userData } from './user-data/user-data';

enum NameSpace {
  Guitars = 'GUITARS',
  User = 'USER',
  Guitar = 'GUITAR',
}

const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
  [NameSpace.User]: userData,
  [NameSpace.Guitar]: guitarData,
});

type RootState = ReturnType<typeof rootReducer>;

export type {RootState};
export {NameSpace, rootReducer};
