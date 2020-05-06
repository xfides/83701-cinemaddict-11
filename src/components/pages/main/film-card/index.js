import {createFilmCardTemplate} from './template.js';
import {truncateStr, formatDurationMinutes} from '../../../../utils';
import {CssClass, FilmFilter} from '../../../../consts';

export const createFilmCardComponent = (film) => {
  const shortFilm = {
    id: film.id,
    title: film.title,
    rate: film.rate,
    pathToPosterImg: film.pathToPosterImg,
    countComments: film.comments.length,
    year: new Date(film.prodDate).getFullYear(),
    duration: formatDurationMinutes(film.duration),
    genre: film.genres[0],
    description: truncateStr(film.description),
    isScheduledActive: film[FilmFilter.SCHEDULED]
      ? CssClass.FILM_CARD_BUTTON_ACTIVE
      : ``,
    isWatchedActive: film[FilmFilter.WATCHED]
      ? CssClass.FILM_CARD_BUTTON_ACTIVE :
      ``,
    isFavoriteActive: film[FilmFilter.FAVORITE]
      ? CssClass.FILM_CARD_BUTTON_ACTIVE
      : ``
  };

  return createFilmCardTemplate(shortFilm);
};
