import {templateUserRank} from './template.js';
import {getUserRank, filterFilmsByField} from '../../utils/common.js';
import {FilmFilters} from '../../consts/index.js';

export const userRank = (films) => {
  const filmsWatched =
    !films ? [] : filterFilmsByField(films, FilmFilters.WATCHED);
  const userRankStatus = getUserRank(filmsWatched.length);

  return templateUserRank(userRankStatus);
};
