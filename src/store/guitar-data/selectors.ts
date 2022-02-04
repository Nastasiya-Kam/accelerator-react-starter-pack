import { Comments } from '../../types/comments';
import { Guitar, GuitarId } from '../../types/guitars';
import { State } from '../../types/state';
import { sort } from '../../utils/utils';
import { NameSpace } from '../root-reducer';

const getGuitar = (state: State): Guitar | null => state[NameSpace.Guitar].guitar;
const getGuitarName = (state: State): string | undefined => state[NameSpace.Guitar].guitar?.name;
const getGuitarId = (state: State): GuitarId | undefined => state[NameSpace.Guitar].guitar?.id;
const getGuitarLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoading;
const getGuitarLoadingDataStatus = (state: State): boolean => state[NameSpace.Guitar].isDataLoaded;
const getGuitarLoadingError = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoadingError;
const getComments = (state: State): Comments | null => state[NameSpace.Guitar].comments;
const getCommentsSortedByDate = (state: State): Comments | null => [...state[NameSpace.Guitar].comments].sort(sort);
const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isCommentsLoading;
const getCommentsCount = (state: State): number => state[NameSpace.Guitar].comments.length;

export {
  getGuitar,
  getGuitarName,
  getGuitarId,
  getGuitarLoadingStatus,
  getGuitarLoadingDataStatus,
  getGuitarLoadingError,
  getComments,
  getCommentsSortedByDate,
  getCommentsLoadingStatus,
  getCommentsCount
};
