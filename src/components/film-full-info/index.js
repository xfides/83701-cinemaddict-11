import {templateFilmFullInfo} from './template.js';
import {
  formatMsToFilmFullDate,
  formatDurationMinutes
} from '../../utils/common.js';
import {ScreenMsgs} from '../../consts/index.js';

export const filmFullInfo = (film) => {
  if (!film) {
    return ScreenMsgs.NO_FILM_FULL_INFO;
  }

  film.prodDate = formatMsToFilmFullDate(film.prodDate);
  film.duration = formatDurationMinutes(film.duration);
  film.scenarists = film.scenarists.join(`, <br/>`);
  film.actors = film.actors.join(`, <br/>`);

  return templateFilmFullInfo(film);
};
