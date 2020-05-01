import {createFilmsBlockTemplate} from './template.js';
import {createFilmCardComponent} from '../film-card/index.js';
import {createShowMoreTemplate} from '../show-more/index.js';
import {CssClass, ScreenMsg} from '../../consts/index.js';

export const createFilmsBlockComponent = (typeSection, films, countCommonFilms) => {
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
      .slice(0, isExtraBlock ? countFilmsToShow : countCommonFilms)
      .map(createFilmCardComponent)
      .join(``);
  }

  if (!isExtraBlock && films && films.length > countCommonFilms) {
    configCardBlock.templateShowMoreBlock = createShowMoreTemplate();
  }

  return createFilmsBlockTemplate(configCardBlock);
};
