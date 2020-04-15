import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info/index.js';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block/index.js';

export const createPopUpComponent = (film) => {
  const templates = {
    filmFullInfo: createFilmFullInfoComponent(film),
    commentsBlock: film ? createCommentsBlockComponent(film.comments) : ``,
    filmFullInfoControl: film ? createFilmFullInfoControlTemplate() : ``
  };

  return createPopUpTemplate(templates);
};
