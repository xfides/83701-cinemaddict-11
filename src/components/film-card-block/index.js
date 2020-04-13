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
    isExtraBlock
  } = typeSection;

  const configFilmCardBlock = {
    titleText: ScreenMsgs.LOADING,
    classHiddenTitle: ``,
    templateFilmCards: ``,
    templateShowMoreBlock: ``,
    classExtraBlock: isExtraBlock
      ? CssClasses.FILM_SECTION_EXTRA
      : CssClasses.FILM_SECTION,
  };


  if (films && films.length === 0) {
    configFilmCardBlock.titleText = ScreenMsgs.NO_FILMS;
  }

  if (films && films.length > 0) {
    configFilmCardBlock.titleText = text;
    configFilmCardBlock.classHiddenTitle =
      isHidden ? CssClasses.HIDDEN_BLOCK : ``;
    configFilmCardBlock.templateFilmCards = films
      .slice(0, countFilmsToShow)
      .map((oneFilm) => filmCard(oneFilm))
      .join(``);
  }

  if (!isExtraBlock && films && films.length > countFilmsToShow) {
    configFilmCardBlock.templateShowMoreBlock = templateShowMore();
  }

  return templateFilmCardBlock(configFilmCardBlock);
};
