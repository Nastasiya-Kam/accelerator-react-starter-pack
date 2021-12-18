import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';

enum NameSpace {
  Guitars = 'GUITARS',
}

const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
});

type RootState = ReturnType<typeof rootReducer>;

export type {RootState};
export {NameSpace, rootReducer};
