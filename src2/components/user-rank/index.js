import {createUserRankTemplate} from './template.js';
import {getUserRank} from '../../utils';

export const createUserRankComponent = (filmsWatched) => {
  if (filmsWatched.length === 0) {
    return `no films`;
  }

  const userRankStatus = getUserRank(filmsWatched.length);

  return createUserRankTemplate(userRankStatus);
};
