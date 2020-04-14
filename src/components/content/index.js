import {templateContent} from './template.js';
import {sortFilmsByFieldWithClone} from '../../utils/common.js';
import {filmCardBlock} from '../film-card-block/index.js';
import {FilmSections} from '../../consts/index.js';

export const content = (films) => {
  const allFilms = !films ? [] : films;

  const filmsTopRated = sortFilmsByFieldWithClone(allFilms, `rate`);
  const filmsMostCommented = sortFilmsByFieldWithClone(allFilms, `comments`);

  const templateCommon = filmCardBlock(FilmSections.COMMON, films);
  const templateTopRated = !allFilms.length ? (
    ``
  ) : (
    filmCardBlock(FilmSections.TOP_RATED, filmsTopRated)
  );
  const templateMostCommented = !allFilms.length ? (
    ``
  ) : (
    filmCardBlock(FilmSections.MOST_COMMENTED, filmsMostCommented)
  );

  return templateContent({
    templateCommon,
    templateTopRated,
    templateMostCommented,
  });
};
