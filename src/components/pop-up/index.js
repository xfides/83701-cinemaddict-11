import {templatePopUp} from './template.js';
import {filmFullInfo} from '../film-full-info/index.js';
import {templateFilmFullInfoControl} from '../film-full-info-control';
import {commentsBlock} from '../comments-block/index.js';

export const popUp = (film) => {
  const templateFilmFullInfo = filmFullInfo(film);
  const templateCommentsBlock = film ? commentsBlock(film.comments) : ``;
  const templateFilmFullInfoControlBlock =
    film ? templateFilmFullInfoControl() : ``;

  return templatePopUp({
    filmFullInfo: templateFilmFullInfo,
    commentsBlock: templateCommentsBlock,
    filmFullInfoControl: templateFilmFullInfoControlBlock
  });
};
