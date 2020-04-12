import {templateContent} from './template.js';
import {sortFilmsByFieldWithClone} from '../../utils/common.js';
import {filmCardBlock} from '../film-card-block/index.js';
import {FilmSections} from '../../consts/index.js';

export const content = (films) => {

  const filmsTopRated = sortFilmsByFieldWithClone(films, `rate`);
  const filmsMostCommented = sortFilmsByFieldWithClone(films, `comments`);

  const templateCommon = filmCardBlock(FilmSections.COMMON, films);
  const templateTopRated = !films || !films.length ? (
      ``
    ) : (
      filmCardBlock(FilmSections.TOP_RATED, filmsTopRated)
    );
  const templateMostCommented = !films || !films.length ? (
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
