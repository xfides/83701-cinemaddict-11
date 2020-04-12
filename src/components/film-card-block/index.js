import {templateFilmCardBlock} from './template.js';
import {filmCard} from '../film-card/index.js';
import {templateShowMore} from '../show-more/index.js';
import {CssClasses, ScreenMsgs} from '../../consts/index.js';

export const filmCardBlock = (typeSection, films) => {
  const {
    title: {
      isHidden
    },
    countFilmsToShow,
    isShowMore,
    isExtraBlock
  } = typeSection;



  const classHiddenTitle = isHidden ? CssClasses.HIDDEN_BLOCK : ``;
  const classExtraBlock =
    isExtraBlock ? CssClasses.FILM_SECTION_EXTRA : CssClasses.FILM_SECTION;
  const templateShowMoreBlock = isShowMore ? templateShowMore() : ``;

  const templateFilmCards = films
    .slice(0, countFilmsToShow)
    .map((oneFilm) => {
      return filmCard(oneFilm);
    })
    .join(``);

  return templateFilmCardBlock({
    text,
    classHiddenTitle,
    classExtraBlock,
    templateFilmCards,
    templateShowMoreBlock
  });
};
