import {templatePopUp} from './template.js';
import {filmFullInfo} from '../film-full-info/index.js';
import {templateFilmFullInfoControl} from '../film-full-info-control';
import {commentsBlock} from '../comments-block/index.js';

export const popUp = (film) => {
  const templates = {
    filmFullInfo: filmFullInfo(film),
    commentsBlock: film ? commentsBlock(film.comments) : ``,
    filmFullInfoControl: film ? templateFilmFullInfoControl() : ``
  };

  return templatePopUp(templates);
};
