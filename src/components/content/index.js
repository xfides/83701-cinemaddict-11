import {templateContent} from './template.js';
import {sortFilmsByFieldWithClone} from '../../utils/common.js';
import {filmCardBlock} from '../film-card-block/index.js';
import {FilmSection} from '../../consts/index.js';

export const content = (films) => {
  const allFilms = !films ? [] : films;

  const filmsTopRated = sortFilmsByFieldWithClone(allFilms, `rate`);
  const filmsMostCommented = sortFilmsByFieldWithClone(allFilms, `comments`);

  const templatesOfFilmSections = {
    common: filmCardBlock(FilmSection.COMMON, films),
    topRated:
      allFilms.length ? filmCardBlock(FilmSection.TOP_RATED, filmsTopRated) : ``,
    mostCommented:
      allFilms.length ? filmCardBlock(FilmSection.MOST_COMMENTED, filmsMostCommented) : ``,
  };

  return templateContent(templatesOfFilmSections);
};
