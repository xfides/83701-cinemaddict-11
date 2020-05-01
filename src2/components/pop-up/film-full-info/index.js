import {createFilmFullInfoTemplate} from './template.js';
import {ScreenMsg} from '../../../consts';
import {
  formatMsToFilmFullDate,
  formatDurationMinutes
} from '../../../utils';

export const createFilmFullInfoComponent = (film) => {
  if (!film) {
    return ScreenMsg.NO_FILM_FULL_INFO;
  }

  film.prodDate = formatMsToFilmFullDate(film.prodDate);
  film.duration = formatDurationMinutes(film.duration);
  film.scenarists = film.scenarists.join(`, <br/>`);
  film.actors = film.actors.join(`, <br/>`);

  return createFilmFullInfoTemplate(film);
};
