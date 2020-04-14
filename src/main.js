import {userRank} from './components/user-rank/index.js';
import {nav} from './components/nav/index.js';
import {templateSort} from './components/sort/index.js';
import {content} from './components/content/index.js';
import {footerStatistics} from './components/footer-statistics/index.js';
import {popUp} from './components/pop-up/index.js';
import {render} from './utils/common.js';
import {PosRender, CssClasses, FilmSections} from './consts/index.js';
import {createFakeFilms} from './utils/fakeData.js';

const fakeFilms = createFakeFilms();
const domNodes = {
  blockHeader: null,
  blockMain: null,
  blockFooterStatistics: null,
  blockScript: null
};

const showMoreFilmCards = () => {
  FilmSections.COMMON.countFilmsToShow =
    FilmSections.COMMON.countFilmsToShow + showMoreFilmCards.increment;

  domNodes.blockMain
    .querySelector(`.${CssClasses.SECTION_FILMS_ALL}`)
    .remove();
  render(domNodes.blockMain, content(fakeFilms));

  showMoreHandler();
};
showMoreFilmCards.increment = FilmSections.COMMON.countFilmsToShow;

const showMoreHandler = () => {
  const showMoreDomNode = document.querySelector(
      `.${CssClasses.SHOW_MORE}`
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

  render(domNodes.blockHeader, userRank(fakeFilms));
  render(domNodes.blockMain, nav(fakeFilms));
  render(domNodes.blockMain, templateSort());
  render(domNodes.blockMain, content(fakeFilms));
  render(domNodes.blockFooterStatistics, footerStatistics(fakeFilms));
  render(
      domNodes.blockScript,
      popUp(Array.isArray(fakeFilms) ? fakeFilms[0] : undefined),
      PosRender.BEFORE_BEGIN
  );

  showMoreHandler();
};

init();
