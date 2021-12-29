import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { userData } from './user-data/user-data';

enum NameSpace {
  Guitars = 'GUITARS',
  User = 'USER',
}

const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
  [NameSpace.User]: userData,
});

type RootState = ReturnType<typeof rootReducer>;

export type {RootState};
export {NameSpace, rootReducer};
