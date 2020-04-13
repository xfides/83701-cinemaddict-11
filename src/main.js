import {userRank} from './components/user-rank/index.js';
import {nav} from './components/nav/index.js';
import {templateSort} from './components/sort/index.js';
import {content} from './components/content/index.js';
import {footerStatistics} from './components/footer-statistics/index.js';
import {popUp} from './components/pop-up/index.js';
import {render} from './utils/common.js';
import {PosRender} from './consts/index.js';
import {createFakeFilms} from './utils/fakeData.js';

const fakeFilms = createFakeFilms();
console.log(fakeFilms);

const init = () => {
  const blockHeader = document.querySelector(`.header`);
  render(blockHeader, userRank(fakeFilms));

  const blockMain = document.querySelector(`.main`);
  render(blockMain, nav(fakeFilms));
  render(blockMain, templateSort());
  render(blockMain, content(fakeFilms));

  const blockStatistics = document.querySelector(`.footer__statistics`);
  render(blockStatistics, footerStatistics(fakeFilms));

  const blockScript = document.querySelector(`script`);
  render(
    blockScript,
    popUp(Array.isArray(fakeFilms) ? fakeFilms[0] : undefined),
    PosRender.BEFORE_BEGIN
  );
};

init();
