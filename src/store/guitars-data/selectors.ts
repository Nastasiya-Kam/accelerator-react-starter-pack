import { Guitars } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const ELEMENT_ON_PAGE_COUNT = 9;

const getGuitars = (state: State): Guitars => state[NameSpace.Guitars].guitars;
const getFirstMinPrice = (state: State): number => state[NameSpace.Guitars].firstMinPrice;
const getFirstMaxPrice = (state: State): number => state[NameSpace.Guitars].firstMaxPrice;
const getSearchingGuitars = (text:string) => (state: State) => {
  const regExpSearching = new RegExp(text, 'i');

  return state[NameSpace.Guitars].guitars.filter((guitar) => guitar.name.match(regExpSearching));
};
const getMinGuitarPrice = (state: State): number => Math.min(...state[NameSpace.Guitars].guitars.map((guitar) => guitar.price));
const getMaxGuitarPrice = (state: State): number => Math.max(...state[NameSpace.Guitars].guitars.map((guitar) => guitar.price));
const getCatalogPageCount = (state: State): number => Math.ceil(state[NameSpace.Guitars].guitars.length / ELEMENT_ON_PAGE_COUNT);

export {
  getGuitars,
  getFirstMinPrice,
  getFirstMaxPrice,
  getSearchingGuitars,
  getMinGuitarPrice,
  getMaxGuitarPrice,
  getCatalogPageCount
};
