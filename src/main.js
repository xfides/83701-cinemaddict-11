import {createUserRankComponent} from './components/user-rank/index.js';
import {createNavComponent} from './components/nav/index.js';
import {createSortTemplate} from './components/sort/index.js';
import {createContentComponent} from './components/content/index.js';
import {
  createFooterStatisticsComponent
} from './components/footer-statistics/index.js';
import {createPopUpComponent} from './components/pop-up/index.js';
import {render} from './utils/common.js';
import {PosRender, CssClass, FilmSection} from './consts/index.js';
import {createFakeFilms} from './utils/fakeData.js';

const fakeFilms = createFakeFilms();

const domNodes = {
  blockHeader: null,
  blockMain: null,
  blockFooterStatistics: null,
  blockScript: null
};

let countCommonFilms = FilmSection.COMMON.countFilmsToShow;

const showMoreFilmCards = () => {
  countCommonFilms += FilmSection.COMMON.countFilmsToShow;

  domNodes.blockMain
    .querySelector(`.${CssClass.SECTION_FILMS_ALL}`)
    .remove();

  render(
      domNodes.blockMain,
      createContentComponent(fakeFilms, countCommonFilms)
  );

  showMoreHandler();
};

const showMoreHandler = () => {
  const showMoreDomNode = document.querySelector(
      `.${CssClass.SHOW_MORE}`
  );

  if (!showMoreDomNode) {
    return;
  }

  showMoreDomNode.addEventListener(`click`, showMoreFilmCards);
};

const init = () => {
  domNodes.blockHeader = document.querySelector(`.header`);
  domNodes.blockMain = document.querySelector(`.main`);
  domNodes.blockFooterStatistics = document.querySelector(
      `.footer__statistics`
  );
  domNodes.blockScript = document.querySelector(`script`);

  render(domNodes.blockHeader, createUserRankComponent(fakeFilms));
  render(domNodes.blockMain, createNavComponent(fakeFilms));
  render(domNodes.blockMain, createSortTemplate());
  render(
      domNodes.blockMain,
      createContentComponent(fakeFilms, countCommonFilms)
  );
  render(
      domNodes.blockFooterStatistics,
      createFooterStatisticsComponent(fakeFilms)
  );
  render(
      domNodes.blockScript,
      createPopUpComponent(Array.isArray(fakeFilms) ? fakeFilms[0] : undefined),
      PosRender.BEFORE_BEGIN
  );

  showMoreHandler();
};

init();
