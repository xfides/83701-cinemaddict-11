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

  const configFilmCardBlock = {
    titleText: ScreenMsg.LOADING,
    classHiddenTitle: ``,
    templateFilmCards: ``,
    templateShowMoreBlock: ``,
    classExtraBlock: isExtraBlock
      ? CssClass.FILM_SECTION_EXTRA
      : CssClass.FILM_SECTION,
  };


  if (films && films.length === 0) {
    configFilmCardBlock.titleText = ScreenMsg.NO_FILMS;
  }

  if (films && films.length > 0) {
    configFilmCardBlock.titleText = text;
    configFilmCardBlock.classHiddenTitle =
      isHidden ? CssClass.HIDDEN_BLOCK : ``;
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
