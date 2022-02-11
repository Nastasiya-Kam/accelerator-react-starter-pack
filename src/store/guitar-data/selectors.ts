import { createSelector } from 'reselect';
import { Comments } from '../../types/comments';
import { Guitar } from '../../types/guitars';
import { State } from '../../types/state';
import { sort } from '../../utils/utils';
import { NameSpace } from '../root-reducer';

const getGuitar = (state: State): Guitar | null => state[NameSpace.Guitar].guitar;
const getGuitarName = (state: State): string | undefined => state[NameSpace.Guitar].guitar?.name;
const getGuitarLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoading;
const getGuitarLoadingDataStatus = (state: State): boolean => state[NameSpace.Guitar].isDataLoaded;
const getGuitarLoadingError = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoadingError;
const getComments = (state: State): Comments | undefined => state[NameSpace.Guitar].guitar?.comments;
const getCommentsSortedByDate  = createSelector(
  [ getComments ],
  (comments) => comments?.slice().sort(sort),
);
const getCommentsCount = (state: State): number | undefined => state[NameSpace.Guitar].guitar?.comments.length;

export {
  getGuitar,
  getGuitarName,
  getGuitarLoadingStatus,
  getGuitarLoadingDataStatus,
  getGuitarLoadingError,
  getComments,
  getCommentsSortedByDate,
  getCommentsCount
};
