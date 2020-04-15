import {createUserRankTemplate} from './template.js';
import {getUserRank, filterFilmsByField} from '../../utils/common.js';
import {FilmFilter} from '../../consts/index.js';

export const createUserRankComponent = (films = []) => {
  const filmsWatched = filterFilmsByField(films, FilmFilter.WATCHED);
  const userRankStatus = getUserRank(filmsWatched.length);

  return createUserRankTemplate(userRankStatus);
};
