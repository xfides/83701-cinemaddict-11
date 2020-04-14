import {templateUserRank} from './template.js';
import {getUserRank, filterFilmsByField} from '../../utils/common.js';
import {FilmFilter} from '../../consts/index.js';

export const userRank = (films) => {
  const filmsWatched =
    !films ? [] : filterFilmsByField(films, FilmFilter.WATCHED);
  const userRankStatus = getUserRank(filmsWatched.length);

  return templateUserRank(userRankStatus);
};
