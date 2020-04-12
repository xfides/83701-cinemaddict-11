import {templateFilmCard} from './template.js';
import {truncateStr, formatDurationMinutes} from '../../utils/common.js';
import {shortDescParams} from '../../consts/index.js'

export const filmCard = (film) => {
  const shortFilm = {
    title: film.title,
    rate: film.rate,
    pathToPosterImg: film.pathToPosterImg,
    countComments: film.comments.length,
    year: new Date(film.prodDate).getFullYear(),
    duration: formatDurationMinutes(film.duration),
    genre: film.genres[0],
    description: truncateStr(
      film.description,
      shortDescParams.COUNT_SYMBOLS,
      shortDescParams.END_SYMBOL
    ),
  };

  return templateFilmCard(shortFilm);
};