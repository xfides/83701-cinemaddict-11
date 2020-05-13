import {createFilmCardTemplate} from './template.js';
import {truncateStr, formatDurationMinutes} from '../../../../utils';
import {FilmFilter} from '../../../../consts';

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
    [FilmFilter.SCHEDULED]: film[FilmFilter.SCHEDULED],
    [FilmFilter.WATCHED]: film[FilmFilter.WATCHED],
    [FilmFilter.FAVORITE]: film[FilmFilter.FAVORITE],
    awaitConfirmChangingCategory: film.awaitConfirmChangingCategory
  };

  return createFilmCardTemplate(shortFilm);
};
