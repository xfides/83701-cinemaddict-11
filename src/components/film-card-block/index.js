import {templateFilmCardBlock} from './template.js';
import {filmCard} from '../film-card/index.js';
import {templateShowMore} from '../show-more/index.js';
import {CssClasses, ScreenMsgs} from '../../consts/index.js';

export const filmCardBlock = (typeSection, films) => {
  const {
    title: {
      text,
      isHidden
    },
    countFilmsToShow,
    isShowMore,
    isExtraBlock
  } = typeSection;

  const classExtraBlock = isExtraBlock ? (
      CssClasses.FILM_SECTION_EXTRA
    ) : (
      CssClasses.FILM_SECTION
    );
  const templateShowMoreBlock = isShowMore ? templateShowMore() : ``;

  let
    titleText = ScreenMsgs.LOADING,
    classHiddenTitle = ``,
    templateFilmCards = ``;

  if (films && films.length === 0) {
    titleText = ScreenMsgs.NO_FILMS;
  }

  if (films && films.length > 0) {
    titleText = text;
    classHiddenTitle = isHidden ? CssClasses.HIDDEN_BLOCK : ``;
    templateFilmCards = films
      .slice(0, countFilmsToShow)
      .map(oneFilm => filmCard(oneFilm))
      .join(``);
  }

  return templateFilmCardBlock({
    titleText,
    classHiddenTitle,
    classExtraBlock,
    templateFilmCards,
    templateShowMoreBlock
  });
};
