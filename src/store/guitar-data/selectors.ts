import { Comments } from '../../types/comments';
import { Guitar } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitar = (state: State): Guitar | null => state[NameSpace.Guitar].guitar;
const getGuitarLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoading;
const getComments = (state: State): Comments | null => state[NameSpace.Guitar].comments;
const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isCommentsLoading;

export {
  getGuitar,
  getGuitarLoadingStatus,
  getComments,
  getCommentsLoadingStatus
};
