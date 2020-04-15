import {createContentTemplate} from './template.js';
import {sortFilmsByFieldWithClone} from '../../utils/common.js';
import {createFilmCardBlockComponent} from '../film-card-block/index.js';
import {FilmSection} from '../../consts/index.js';

export const createContentComponent = (films, countCommonFilms) => {
  const allFilms = films ? films : [];

  const filmsTR = sortFilmsByFieldWithClone(allFilms, `rate`);
  const filmsMC = sortFilmsByFieldWithClone(allFilms, `comments`);

  const templatesOfFilmSections = {
    common: createFilmCardBlockComponent(
        FilmSection.COMMON, films, countCommonFilms
    ),
    topRated: allFilms.length
      ? createFilmCardBlockComponent(FilmSection.TOP_RATED, filmsTR)
      : ``,
    mostCommented: allFilms.length
      ? createFilmCardBlockComponent(FilmSection.MOST_COMMENTED, filmsMC)
      : ``
  };

  return createContentTemplate(templatesOfFilmSections);
};
