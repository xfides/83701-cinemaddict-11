import {createFilmCardTemplate} from './template.js';
import {truncateStr, formatDurationMinutes} from '../../../../utils';

export const createFilmCardComponent = (film) => {
  const shortFilm = {
    title: film.title,
    rate: film.rate,
    pathToPosterImg: film.pathToPosterImg,
    countComments: film.comments.length,
    year: new Date(film.prodDate).getFullYear(),
    duration: formatDurationMinutes(film.duration),
    genre: film.genres[0],
    description: truncateStr(film.description)
  };

  return createFilmCardTemplate(shortFilm);
};
