import { Guitar } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitar = (state: State): Guitar | null => state[NameSpace.Guitar].guitar;

export {
  getGuitar
};
