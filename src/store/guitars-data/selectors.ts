import { Guitars } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitars = (state: State): Guitars => state[NameSpace.Guitars].guitars;
const getFirstMinPrice = (state: State): number => state[NameSpace.Guitars].firstMinPrice;
const getFirstMaxPrice = (state: State): number => state[NameSpace.Guitars].firstMaxPrice;
const getPageCount = (state: State): number => state[NameSpace.Guitars].pageCount;
const getSearchingGuitars = (text:string) => (state: State) => {
  const regExpSearching = new RegExp(text, 'i');

  return state[NameSpace.Guitars].guitars.filter((guitar) => guitar.name.match(regExpSearching));
};

export {
  getGuitars,
  getFirstMinPrice,
  getFirstMaxPrice,
  getPageCount,
  getSearchingGuitars
};
