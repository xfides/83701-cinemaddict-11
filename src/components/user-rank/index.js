import {createUserRankTemplate} from './template.js';
import {FilmFilter} from '../../consts/index.js';
import {
  getUserRank,
  filterFilmsByField,
  ensureArray
} from '../../utils/common.js';

export const createUserRankComponent = (controlData) => {
  let films = controlData.getFilms();
  films = ensureArray(films);
  const filmsWatched = filterFilmsByField(films, FilmFilter.WATCHED);
  const userRankStatus = getUserRank(filmsWatched.length);

  return createUserRankTemplate(userRankStatus);
};
