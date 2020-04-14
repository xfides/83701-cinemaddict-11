import {templateFilmCardBlock} from './template.js';
import {filmCard} from '../film-card/index.js';
import {templateShowMore} from '../show-more/index.js';
import {CssClass, ScreenMsg} from '../../consts/index.js';

export const filmCardBlock = (typeSection, films) => {
  const {
    title: {
      text,
      isHidden
    },
    countFilmsToShow,
    isExtraBlock
  } = typeSection;

  const configCardBlock = {
    titleText: ScreenMsg.LOADING,
    classHiddenTitle: ``,
    templateFilmCards: ``,
    templateShowMoreBlock: ``,
    classExtraBlock: isExtraBlock
      ? CssClass.FILM_SECTION_EXTRA : CssClass.FILM_SECTION
  };

  if (films && films.length === 0) {
    configCardBlock.titleText = ScreenMsg.NO_FILMS;
  }

  if (films && films.length > 0) {
    configCardBlock.titleText = text;
    configCardBlock.classHiddenTitle = isHidden ? CssClass.HIDDEN_BLOCK : ``;
    configCardBlock.templateFilmCards = films
      .slice(0, countFilmsToShow)
      .map(filmCard)
      .join(``);
  }

  if (!isExtraBlock && films && films.length > countFilmsToShow) {
    configCardBlock.templateShowMoreBlock = templateShowMore();
  }

  return templateFilmCardBlock(configCardBlock);
};
