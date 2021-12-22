import { Guitars } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitars = (state: State): Guitars => state[NameSpace.Guitars].guitars;
const getSearchingGuitars = (text:string) => (state: State) => {
  const regExpSearching = new RegExp(text, 'i');

  return state[NameSpace.Guitars].guitars.filter((guitar) => guitar.name.match(regExpSearching));
};
const getMinGuitarPrice = (state: State): number => Math.min(...state[NameSpace.Guitars].guitars.map((guitar) => guitar.price));
const getMaxGuitarPrice = (state: State): number => Math.max(...state[NameSpace.Guitars].guitars.map((guitar) => guitar.price));

export {
  getGuitars,
  getSearchingGuitars,
  getMinGuitarPrice,
  getMaxGuitarPrice
};
