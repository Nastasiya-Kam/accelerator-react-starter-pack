import { createSelector } from 'reselect';
import { Comments } from '../../types/comments';
import { Guitar } from '../../types/guitars';
import { State } from '../../types/state';
import { sort } from '../../utils/utils';
import { NameSpace } from '../root-reducer';

const getGuitar = (state: State): Guitar | null => state[NameSpace.Guitar].guitar;
const getGuitarLoadingStatus = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoading;
const getGuitarLoadingDataStatus = (state: State): boolean => state[NameSpace.Guitar].isDataLoaded;
const getGuitarLoadingError = (state: State): boolean => state[NameSpace.Guitar].isGuitarLoadingError;

const getGuitarName  = createSelector(
  [ getGuitar ],
  (guitar): string | undefined => guitar?.name,
);

const getComments  = createSelector(
  [ getGuitar ],
  (guitar): Comments | undefined => guitar?.comments,
);

const getCommentsCount  = createSelector(
  [ getGuitar ],
  (guitar): number | undefined => guitar?.comments.length,
);

const getCommentsSortedByDate  = createSelector(
  [ getComments ],
  (comments) => comments?.slice().sort(sort),
);

export {
  getGuitar,
  getGuitarLoadingStatus,
  getGuitarLoadingDataStatus,
  getGuitarLoadingError,
  getGuitarName,
  getComments,
  getCommentsCount,
  getCommentsSortedByDate
};
